<template>
  <div id="app">
    <div id="nav">
      <h2>Unsere Uhr</h2>
      <div class="list-group-flush">
        <router-link class="list-group-item list-group-item-action" to="/">Home</router-link>
        <router-link class="list-group-item list-group-item-action" to="/text">Anzeigeeinstellungen</router-link>
        <router-link class="list-group-item list-group-item-action" to="/color">Farbeinstellungen</router-link>
        <router-link class="list-group-item list-group-item-action" to="/light">Umgebungslicht</router-link>
        <router-link class="list-group-item list-group-item-action" to="/brightness">Helligkeit</router-link>
      </div>
    </div>
    <div id="main-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "./styles/main.scss";

#nav > h2 {
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

#main-container {
  overflow-x: hidden;
}
</style>
