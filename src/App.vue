<template>
  <div id="app">
    <div id="nav">
      <h2>Unsere Uhr</h2>
      <div class="d-block d-sm-none">XS</div>
      <div class="d-none d-sm-block d-md-none">SM</div>
      <div class="d-none d-md-block d-lg-none">MD</div>
      <div class="d-none d-lg-block d-xl-none">LG</div>
      <div class="d-none d-xl-block d-xxl-none">XL</div>
      <div class="d-none d-xxl-block">XXL</div>
      <div class="list-group-flush">
        <router-link class="list-group-item list-group-item-action" to="/">Home</router-link>
        <router-link class="list-group-item list-group-item-action" to="/text">Anzeigeeinstellungen</router-link>
        <router-link class="list-group-item list-group-item-action" to="/color">Farbeinstellungen</router-link>
        <router-link class="list-group-item list-group-item-action" to="/light">Umgebungslicht</router-link>
        <router-link class="list-group-item list-group-item-action" to="/brightness">Helligkeit</router-link>
      </div>
    </div>
    <div id="main-container">
      <input type="button" value="sdf" @click="toggleNavigation" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Slideout from 'slideout'

export default {
  mounted() {
    let offset = document.getElementById('nav').offsetWidth

    this.slideout = new Slideout({
      menu: document.getElementById('nav'),
      panel: document.getElementById('main-container'),
      padding: offset,
      tolerance: 70
    })

    console.log(this.slideout, offset)
  },
  methods: {
    toggleNavigation() {
      this.slideout.toggle()
    }
  }
}
</script>


<style lang="scss">
@import "./styles/main.scss";

#nav > h2 {
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

#main-container {
  overflow-x: hidden;
}






      body {
        width: 100%;
        height: 100%;
      }

      .slideout-menu {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 0;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        display: none;
      }

      .slideout-panel {
        position: relative;
        z-index: 1;
        will-change: transform;
        background-color: whitesmoke;
      }

      .slideout-open,
      .slideout-open body,
      .slideout-open .slideout-panel {
        overflow: hidden;
      }

      .slideout-open .slideout-menu {
        display: block;
      }
</style>
