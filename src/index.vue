<script setup>
import { RouterView } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'

import { ref } from 'vue';
const msg = ref('')
</script>
<template>
  <div class="container text-center">
    <div class="row">
      <div class="col d-flex">
        <header class="d-flex ms-auto">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

          <div class="row wrapper align-items-center">
            <HelloWorld :msg="msg" />
            <div class="greetings">
              <h1 class="green">{{ msg }}</h1>
              <h3>
                <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
              </h3>
            </div>
          </div>
        </header>
      </div>
      <div class="col">
        <a href="https://firebase.google.com/docs/auth/web/firebaseui?hl=fa">
          <img alt="Firebase logo" src="./assets/image/logo.svg" style="height: 100px;">
        </a>        
      </div>
    </div>
  </div>

  <RouterView />
</template>  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
