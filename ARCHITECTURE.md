# Architecture Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [How the Word-Clock Works](#how-the-word-clock-works)
3. [Component Hierarchy](#component-hierarchy)
4. [Data Flow](#data-flow)
5. [Clock Component Deep Dive](#clock-component-deep-dive)
6. [Route Map](#route-map)
7. [API Contract](#api-contract)
8. [Build & Development](#build--development)
9. [Code Review Findings](#code-review-findings)
10. [Suggested Improvements](#suggested-improvements)

---

## System Overview

This project is a **Vue 2 single-page application** that serves as the control interface for a custom-built German LED word-clock ("Wortuhr"). The clock is a physical device with an 11×10 grid of individually addressable LEDs behind letter cutouts, plus 4 corner LEDs for minute dots.

The UI runs on the clock's embedded hardware (typically a Raspberry Pi or similar) and is served alongside a backend REST API. Users access it via a browser or as an installed PWA on mobile devices. All user-facing text is in German.

**Key technologies:** Vue 2.5, Vue Router 3, Bootstrap 4 (SCSS), Chart.js 2, Socket.IO client 2.x, a-color-picker, Slideout.js. Built with Vue CLI 4.5.9 (webpack). See `CLAUDE.md` for the full tech stack and command reference.

---

## How the Word-Clock Works

The physical clock face is an 11×10 grid of German letters:

```
E S K I S T A F Ü N F
Z E H N Z W A N Z I G
D R E I V I E R T E L
V O R F U N K N A C H
H A L B A E L F Ü N F
E I N S X Ä M Z W E I
D R E I A U J V I E R
S E C H S N L A C H T
S I E B E N Z W Ö L F
Z E H N E U N K U H R
```

Plus 4 corner dots (●) at the corners for minute remainders (1–4 minutes past the last 5-minute interval).

The backend determines which LEDs to light based on the current time and sends an array of LED values. The UI maps these LED indices to CSS classes on the letter grid to highlight the active words. For example, at 9:25 the clock lights up: **ES IST FÜNF VOR HALB ZEHN**.

---

## Component Hierarchy

```
App.vue
│   ├── Slideout navigation (mobile drawer via Slideout.js)
│   ├── Fixed header with live HH:MM clock display
│   └── <router-view> renders:
│
├── Home.vue (/)
│   ├── Clock.vue — word grid visualization (props: leds, configuration)
│   └── Alert.vue ×2 — layout read error, status read error
│
├── Color.vue (/color)
│   ├── Clock.vue — color preview (props: color)
│   ├── a-color-picker — external lib mounted to #colorPickerClock
│   └── Alert.vue ×1 — read error
│
├── Text.vue (/text)
│   ├── OptionSelect.vue ×N — one per display strategy
│   └── Alert.vue ×2 — success, error
│
├── Brightness.vue (/brightness)
│   └── Alert.vue ×3 — read error, success, error
│
├── Light.vue (/light)
│   └── Alert.vue ×3 — read error, success, error
│
├── Schedule.vue (/brightness/schedule)
│   ├── ActiveTimeItem.vue ×N — one per schedule entry
│   └── Alert.vue ×3 — read error, success, error
│
└── AmbientSensor.vue (/light/sensor)
    └── AmbientLightRealTimeChart.vue — live Socket.IO line chart
    [AmbientLightChart.vue exists but is commented out]
```

---

## Data Flow

### Fetch-on-Mount Pattern

Every view follows the same pattern:

1. Component mounts → `fetch(baseUri + '/settings/...')` in `mounted()`
2. Response stored in component's local `data()` — **no Vuex, no shared state**
3. User edits form fields bound to local data via `v-model`
4. User clicks "Speichern" (Save) → `fetch(..., { method: 'put', body: JSON.stringify(data) })`
5. Success/error feedback via imperative `this.$refs.alertName.open()` calls

### Clock Status Polling

`Home.vue` polls `GET /api/status/clock` every 5 seconds via `setInterval`. The response `{ ledValues: number[] }` is passed as a prop to `Clock.vue`, which computes which word groups are active and highlights them.

### Real-Time Ambient Light

`AmbientLightRealTimeChart.vue` opens a WebSocket connection via Socket.IO (`ws://${window.location.host}`) and listens for `'ambient-light'` events. Each event delivers an array of ~10 raw sensor readings. The chart calculates min/avg/max per second and maintains a 30-second sliding window.

### Alert Component

`Alert.vue` is a Bootstrap alert wrapper with `open()` and `close()` methods. It is always controlled imperatively via template refs (`this.$refs.alertName.open()`), never via props. Supports `type` prop: `"error"`, `"success"`, `"warning"`.

---

## Clock Component Deep Dive

`Clock.vue` is the most architecturally significant component. It renders the 11×10 German letter grid plus 4 corner dots as a Bootstrap grid of `<div>` elements. Each letter cell has one or more CSS classes identifying which word group it belongs to:

| CSS Class | Word | Meaning |
|-----------|------|---------|
| `esIst` | E S _ I S T | "It is" |
| `mFuenf` | F Ü N F | "five" (minutes) |
| `mZehn` | Z E H N | "ten" (minutes) |
| `mZwanzig` | Z W A N Z I G | "twenty" (minutes) |
| `viertel` | V I E R T E L | "quarter" |
| `dreiviertel` | D R E I V I E R T E L | "three-quarter" |
| `vor` | V O R | "before" |
| `nach` | N A C H | "after" |
| `halb` | H A L B | "half" |
| `ein`/`eins` | E I N (S) | "one" |
| `zwei`–`zwoelf` | ... | hour words (2–12) |
| `uhr` | U H R | "o'clock" |
| `undEins`–`undVier` | ● | corner dots (1–4 min remainder) |

### LED-to-Class Mapping

The backend endpoint `GET /api/settings/led-layout` returns a mapping of CSS class names to LED indices:

```json
{ "esIst": [0, 1, 3, 4, 5], "mFuenf": [7, 8, 9, 10], ... }
```

### Highlighting Logic

`Clock.vue` uses a **computed property** `activeClasses` that checks: for each class in the layout config, are all its LED indices > 0 in the current `ledValues` array? If so, that word group is active.

A **watcher** then uses **direct DOM manipulation** (`document.querySelectorAll`) to set `style.color = 'white'` on active elements and `style.color = initialColor` on inactive ones. This bypasses Vue's reactivity system — intentional for performance, but fragile. Any change to the template's CSS class names will break highlighting.

### Responsive Sizing

The `resizeBehaviour()` function measures a reference cell's width and sets all row heights to match, keeping the grid square. It runs on mount and on `window.resize`.

---

## Route Map

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Home.vue | Dashboard — live clock visualization with LED status |
| `/color` | Color.vue | LED color picker — set uniform color for all LEDs |
| `/text` | Text.vue | Display strategy settings — time format options |
| `/brightness` | Brightness.vue | Brightness strategy — FIXED_VALUE or SCHEDULE |
| `/brightness/schedule` | Schedule.vue | Schedule entries — active hours with day/time/brightness |
| `/light` | Light.vue | Ambient light sensor configuration — timespan, min/max |
| `/light/sensor` | AmbientSensor.vue | Sensor data — 24h stats + live real-time chart |

All routes are eagerly loaded (no code splitting or lazy loading).

---

## API Contract

All endpoints are prefixed with `/api`. The base URI is configured in `src/util/api.js`.

### Status Endpoints (read-only)

**GET `/api/status/clock`**
Returns current LED state. Polled every 5 seconds by Home.vue.
```json
{ "ledValues": [0, 0, 0, 16777215, 16777215, ...] }
```
Values are integers: 0 = off, non-zero = color value (hex encoded as decimal).

**GET `/api/status/light`**
Returns aggregated ambient light sensor data (last 24h).
```json
{ "average": 0.34, "min": 0.01, "max": 0.89, "samples": 86400, "timespan": "24h" }
```

### Settings Endpoints (GET + PUT)

**GET/PUT `/api/settings/color`**
Array of integer color values, one per LED. Length matches total LED count.
```json
[16777215, 16777215, 16777215, ...]
```

**GET/PUT `/api/settings/brightness`**
```json
{ "strategy": "FIXED_VALUE", "strategies": ["FIXED_VALUE", "SCHEDULE"], "fixedValue": 80 }
```

**GET/PUT `/api/settings/light`**
```json
{ "timeSpan": 5, "readInterval": 100, "minimum": 0.0, "maximum": 0.5 }
```

**GET/PUT `/api/settings/text`**
GET returns strategies with options; PUT sends only selected values.
```json
{
  "Strategies": [{ "id": "timeFormat", "title": "...", "description": "...", "options": [...] }],
  "timeFormat": "selectedOptionId"
}
```

**GET/PUT `/api/settings/schedule`**
Array of schedule entries. Each entry defines an active window with day range, time range, and brightness.
```json
[{
  "id": "uuid-string",
  "startDay": 0, "endDay": 6,
  "startTime": { "h": 5, "m": 0, "s": 0 },
  "endTime": { "h": 22, "m": 0, "s": 0 },
  "brightness": 60,
  "color": null,
  "isFixedBrightness": false
}]
```
Days: 0=Monday through 6=Sunday.

### Layout Endpoint (read-only)

**GET `/api/settings/led-layout`**
Maps CSS class names to arrays of LED indices. Used by Clock.vue to determine which word groups to highlight.
```json
{ "esIst": [0, 1, 3, 4, 5], "mFuenf": [7, 8, 9, 10], "nach": [57, 58, 59, 60], ... }
```

### WebSocket

**Event: `ambient-light`** (via Socket.IO)
Emitted once per second. Payload is an array of ~10 raw sensor readings (floats 0–1).
```json
[0.42, 0.43, 0.41, 0.44, 0.42, 0.43, 0.41, 0.42, 0.43, 0.42]
```

---

## Build & Development

### Build System

- **Vue CLI 4.5.9** with webpack (no custom `vue.config.js`)
- **Babel** via `@vue/cli-plugin-babel` with Vue CLI preset
- **SCSS** compiled via `node-sass` 4.11 + `sass-loader` 7.1
- **PWA** plugin generates service worker for production builds
- **ESLint** config in `package.json`: extends `plugin:vue/essential` + `eslint:recommended`
- **PostCSS** with autoprefixer

### Custom Bootstrap Configuration

`src/styles/main.scss` imports the full Bootstrap 4 SCSS source and adds a custom `xxl` breakpoint at 1600px with a container max-width of 1540px.

### Testing

- **Unit:** Mocha + Chai + Vue Test Utils — only scaffolded example test exists
- **E2E:** Cypress — only scaffolded example test exists
- **No coverage configuration**

### Deployment

The app builds to static files in `dist/`. All npm packages are in `devDependencies` (none in `dependencies`) because only the built output is deployed — typically to the clock's embedded web server.

---

## Code Review Findings

### High Severity

| Issue | Location | Description |
|-------|----------|-------------|
| Silent error swallowing | `Text.vue:95-97` | Empty `.catch()` block — fetch failures are completely hidden from the user |
| Missing error handling | `AmbientSensor.vue:67-76` | No `.catch()` on fetch — unhandled promise rejection if API is unreachable |
| No save feedback | `Color.vue:106-115` | `saveColor()` fires a PUT but provides no success/error alert to the user |
| Direct DOM manipulation | `Clock.vue:215-222` | Uses `document.querySelectorAll()` + `element.style.color` instead of Vue reactivity. Fragile — CSS class name changes break highlighting silently |

### Medium Severity

| Issue | Location | Description |
|-------|----------|-------------|
| Console.log in production | `Schedule.vue:84,90` | `console.log()` statements left in `onDelete()` and `addElement()` methods |
| Version mismatch | `package.json` vs `App.vue:35` | Package says `1.0.5`, navigation sidebar hardcodes `v1.0.4` |
| Unused Vuex store | `store.js` | Imported and mounted in `main.js` but completely empty — adds ~10KB to bundle for nothing |
| Dead code | `src/util/mediaListener.js` | Defines responsive breakpoint matchers but is never imported by any component |
| Dead code | `AmbientLightChart.vue` | Component exists but its import in `AmbientSensor.vue:47` is commented out |
| Duplicated fetch pattern | All 7 views | Every view independently implements the same fetch → parse → store → error pattern with no shared abstraction |
| Anti-pattern: `let component = this` | `Home.vue:45`, `Color.vue:118`, `Brightness.vue:92`, `Light.vue:118`, `Text.vue:86`, `AmbientSensor.vue:65`, `Schedule.vue:64` | Used to capture `this` reference in callbacks — arrow functions would be cleaner |
| Typo in heading | `Home.vue:5` | "Aktelle Uhrzeit" should be "Aktuelle Uhrzeit" |
| Empty `onChange` handler | `Schedule.vue:86-88` | Method body is empty — the `@input` event from `ActiveTimeItem` is handled but does nothing |
| No `e.preventDefault()` ordering | `Light.vue:157` | `e.preventDefault()` is called at the end of `submitData()` instead of at the beginning — form may briefly submit |
| Redundant API config | `src/util/api.js` | Both branches of the `NODE_ENV` conditional return `'/api'` — the condition is pointless |
| Debug breakpoint indicators | `App.vue:29-34` | Visible `<div>` elements showing "XS", "SM", "MD", etc. for current breakpoint — should be removed or hidden in production |

### Low Severity

| Issue | Location | Description |
|-------|----------|-------------|
| No TypeScript | Entire project | All source is plain JavaScript — no type safety |
| No prop validation | `Clock.vue:185-188` | Props use array shorthand (`[Object, Array]`) instead of typed objects with defaults and validators |
| No test coverage | `tests/` | Only auto-generated example tests exist; no actual component or integration tests |
| No route lazy-loading | `router.js` | All 7 routes are eagerly imported — minor impact given the small app size |
| Deprecated dependency | `package.json` | `node-sass` is deprecated; should migrate to `sass` (dart-sass) |
| Commented-out feature | `Color.vue:37-51` | Individual LED coloring UI is HTML-commented out — incomplete feature |
| Duplicate `id` attributes | `ActiveTimeItem.vue:6,12,21,48` | Multiple instances of the component will have duplicate `id="inputGroup-sizing-default"` attributes |
| Mixed language | Throughout | UI is German, code identifiers are English — intentional but worth noting for new contributors |
| Socket.IO no cleanup | `AmbientLightRealTimeChart.vue` | Socket connection is opened in `mounted()` but never closed in `beforeDestroy()` — potential memory leak |
| Timer not cleared | `App.vue:82` | The 1-second `setInterval` for the header clock is never cleared in `beforeDestroy()` |
| `padStart` type coercion | `App.vue:93-94` | `padStart(2, 0)` passes number `0` instead of string `'0'` — works due to implicit coercion but is technically incorrect |
| Inconsistent button text | `Text.vue:24` | Uses English "Save" while all other views use German "Speichern" |

---

## Suggested Improvements

Prioritized list of recommended changes (not exhaustive):

1. **Add error handling** to all API calls — at minimum, show an Alert on failure
2. **Remove console.log statements** from Schedule.vue
3. **Fix the version mismatch** — update `App.vue:35` to match `package.json`
4. **Fix the typo** — "Aktelle" → "Aktuelle" in `Home.vue:5`
5. **Create a shared API service** to replace duplicated fetch patterns across all views
6. **Clean up dead code** — remove `mediaListener.js` and the commented-out `AmbientLightChart` import
7. **Close Socket.IO connection** in `AmbientLightRealTimeChart.vue`'s `beforeDestroy()`
8. **Clear the header clock interval** in `App.vue`'s `beforeDestroy()`
9. **Remove or use Vuex** — either add state management or remove the unused store
10. **Migrate `node-sass` to `sass`** (dart-sass) before Node.js compatibility breaks
11. **Add prop validation** with types, defaults, and validators
12. **Add unit tests** for critical components (Clock.vue highlighting logic, data transformations)
13. **Remove breakpoint debug indicators** from `App.vue` or hide behind a dev-only flag
14. **Consider Vue 3 migration** — Vue 2 reached end-of-life December 2023
