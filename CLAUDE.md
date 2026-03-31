# CLAUDE.md

## Project Overview

**unsere-uhr-ui** is a Vue 2 single-page application for controlling a custom-built German LED word-clock ("Wortuhr"). The clock hardware displays time using an 11x10 grid of letters that spell out the current time in German (e.g., "ES IST FÜNF NACH HALB ZEHN") plus 4 corner dots for minute remainders. This UI communicates with the clock's backend via REST API and Socket.IO for real-time data. The UI is entirely in German. PWA-enabled for mobile installation.

**Author:** Paul Rupek | **Version:** 1.0.5

## Key Commands

- `npm run serve` — dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (vue/essential + eslint:recommended)
- `npm run test:unit` — Mocha/Chai unit tests
- `npm run test:e2e` — Cypress e2e tests

No `vue.config.js` exists — uses default Vue CLI 4.5.9 (webpack) configuration.

## Tech Stack

- **Framework:** Vue 2.5, Vue Router 3 (history mode), Vuex 3 (installed but **unused**)
- **Styling:** Bootstrap 4.4 via SCSS with custom `xxl` breakpoint at 1600px
- **Charts:** Chart.js 2 + vue-chartjs 3 (ambient light visualization)
- **Real-time:** Socket.IO client 2.x (live sensor data via WebSocket)
- **UI libs:** a-color-picker (color selection), Slideout.js (mobile nav drawer), feather-icons
- **Build:** Vue CLI 4.5.9, node-sass (deprecated), babel-eslint
- **All packages are in devDependencies** (none in dependencies — works because the app is built to static files)

## Architecture

```
src/
├── main.js                  # Entry point: mounts Vue with router + empty store
├── App.vue                  # Root: Slideout nav, fixed header with HH:MM clock, <router-view>
├── router.js                # 7 routes, all eagerly loaded (no lazy loading)
├── store.js                 # Empty Vuex store — never used for state management
├── registerServiceWorker.js # PWA service worker (production only)
├── views/
│   ├── Home.vue             # Dashboard: polls /api/status/clock every 5s, renders Clock component
│   ├── Color.vue            # Color picker (a-color-picker) → PUT /api/settings/color
│   ├── Brightness.vue       # Strategy selector (FIXED_VALUE | SCHEDULE) → PUT /api/settings/brightness
│   ├── Light.vue            # Ambient light sensor config → PUT /api/settings/light
│   ├── Text.vue             # Display strategy options → PUT /api/settings/text
│   ├── Schedule.vue         # Brightness schedule entries (add/remove/save) → PUT /api/settings/schedule
│   └── AmbientSensor.vue    # 24h stats + live chart via Socket.IO
├── components/
│   ├── Clock.vue            # German word grid (11x10 + 4 dots), highlights active words via DOM manipulation
│   ├── Alert.vue            # Bootstrap alert wrapper, controlled via $refs: .open() / .close()
│   ├── OptionSelect.vue     # Multi-option card selector with .sync binding
│   ├── ActiveTimeItem.vue   # Schedule entry form (day/time/brightness), emits 'input' and 'delete'
│   ├── AmbientLightChart.vue          # 24h light data chart (exists but commented out in consumer)
│   └── AmbientLightRealTimeChart.vue  # Live Socket.IO chart (30s sliding window, min/avg/max)
├── util/
│   ├── api.js               # Exports baseUri (always '/api')
│   └── mediaListener.js     # DEAD CODE: defines breakpoint matchers, never imported anywhere
├── styles/
│   └── main.scss            # Bootstrap 4 import with custom grid breakpoints + app layout styles
└── assets/
    └── logo.png
```

## Component Registration Convention

Components are registered with kebab-case `uu-*` prefix:
- `'uu-clock': Clock`
- `'uu-alert': Alert`
- `'uu-options': OptionSelect`
- `'uu-rtc': AmbientLightRealTimeChart`
- `'uu-chart': AmbientLightChart` (commented out)

## Data Flow Patterns

- **Fetch on mount:** Each view fetches its data in `mounted()` using bare `fetch()` with `baseUri` from `@/util/api`. No shared API service layer.
- **Local state only:** All state lives in component `data()`. Vuex is unused.
- **Save pattern:** User edits local state, clicks "Speichern" (Save), component PUTs JSON to API.
- **Alert feedback:** Success/error alerts are shown via imperative `this.$refs.alertName.open()` calls.
- **Clock polling:** Home.vue polls `/api/status/clock` every 5 seconds via `setInterval`.
- **Real-time chart:** AmbientLightRealTimeChart.vue connects to Socket.IO and listens for `'ambient-light'` events.
- **`let component = this`** pattern is used in several `mounted()` hooks instead of arrow functions.

## API Endpoints

| Method | Path | Data Shape |
|--------|------|------------|
| GET | `/api/status/clock` | `{ ledValues: number[] }` |
| GET | `/api/status/light` | `{ average, min, max, samples, timespan }` |
| GET | `/api/settings/led-layout` | `{ [cssClassName]: number[] }` — maps CSS classes to LED indices |
| GET/PUT | `/api/settings/color` | `number[]` — hex color value per LED |
| GET/PUT | `/api/settings/brightness` | `{ strategy, strategies[], fixedValue? }` |
| GET/PUT | `/api/settings/light` | `{ timeSpan, readInterval, minimum, maximum }` |
| GET/PUT | `/api/settings/text` | `{ Strategies: [{id, title, description, options}], [strategyId]: optionId }` |
| GET/PUT | `/api/settings/schedule` | `[{ id, startDay, endDay, startTime: {h,m,s}, endTime: {h,m,s}, brightness, color, isFixedBrightness }]` |
| WebSocket | `ambient-light` event | `number[]` — raw sensor readings per second |

## Known Issues / Gotchas

**Critical for anyone editing this code:**

- **Empty Vuex store** — `store.js` is imported and mounted but has no state/mutations/actions. Don't add state there without a deliberate migration plan.
- **Clock.vue uses direct DOM manipulation** — `document.querySelectorAll()` + `element.style.color` instead of Vue reactivity. Intentional for performance but fragile. Changes to the template class names will break the highlighting logic.
- **Missing error handling:**
  - `Text.vue:95-97` — empty `.catch()` block, errors silently swallowed
  - `AmbientSensor.vue:67-76` — no `.catch()` at all on fetch
  - `Color.vue:106-115` — `saveColor()` has no success/error feedback to user
- **`console.log()` left in production code** — `Schedule.vue:84` and `Schedule.vue:90`
- **Dead code:** `src/util/mediaListener.js` is never imported. `AmbientLightChart.vue` exists but its import in `AmbientSensor.vue` is commented out.
- **Version mismatch:** `package.json` says `1.0.5`, but `App.vue:35` nav hardcodes `v1.0.4`
- **Typo:** `Home.vue:5` says "Aktelle Uhrzeit" — should be "Aktuelle Uhrzeit"
- **Deprecated dependency:** `node-sass` is deprecated; should migrate to `sass` (dart-sass)
- **No prop validation:** All props use array shorthand (`[Object, Array]`) instead of typed objects with defaults
- **No test coverage:** Only scaffolded example tests exist (HelloWorld component + basic Cypress visit)
- **Color.vue** has HTML-commented-out code for an individual LED coloring feature (not yet implemented)
- **Schedule.vue** has a "coming soon" color-per-entry feature mentioned in Light.vue's description
