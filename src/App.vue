<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/text">Text</router-link> |
      <router-link to="/color">Color</router-link> | 
      <router-link to="/light">Light</router-link> | 
      <router-link to="/brightness">Brightness</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/main.scss";
</style>
