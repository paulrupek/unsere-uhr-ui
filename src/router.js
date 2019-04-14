import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Color from './views/Color.vue'
import Light from './views/Light.vue'
import Brightness from './views/Brightness.vue'
import Text from './views/Text.vue'
import AmbientSensor from '@/views/AmbientSensor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/color',
      name: 'color',
      component: Color
    },
    {
      path: '/light',
      name: 'light',
      component: Light
    },
    
    {
      path: '/brightness',
      name: 'brightness',
      component: Brightness
    },
    {
      path: '/text',
      name: 'text',
      component: Text
    },
    {
      path: '/ambient-sensor',
      name: 'ambient-sensor',
      component: AmbientSensor
    }
  ]
})
