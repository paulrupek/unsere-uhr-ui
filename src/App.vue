<template>
  <div id="app">
    
    <div id="header">
      <button id="toggleButton" type="button" class="btn btn-outline-secondary d-inline-block d-lg-none btn-lg" @click="toggleNavigation">☰</button>
      <div class="btn btn-lg">.</div>
    </div>
    <div id="nav">
      <h4>Navigation</h4>	
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

    let fixed = document.querySelector('#header');

    this.slideout.on('translate', (translated) => {
      fixed.style.transform = 'translateX(' + translated + 'px)'
    })

    this.slideout.on('beforeopen', () => {
      fixed.style.transition = 'transform 300ms ease'
      fixed.style.transform = `translateX(${offset}px)`
    })

    this.slideout.on('beforeclose', () => {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(0px)';
    })

    this.slideout.on('open', () => {
      fixed.style.transition = '';
    })

    this.slideout.on('close', () => {
      fixed.style.transition = '';
    })
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

#nav {
  z-index: -1;
}

#header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #292930;
  min-height: 2rem;
  z-index: 21;
}

#main-container {
  padding-top: 4rem;
  box-shadow:  0px 0px 12px 0px rgba(0,0,0,0.75);
  z-index: 20;
}

#nav > h4 {
  padding: 1rem;
}

#main-container {
  overflow-x: hidden;
}

#toogleButton, #toggleButton:focus, #toggleButton:active {
  outline-width: 0;
  box-shadow: none;
}
</style>
