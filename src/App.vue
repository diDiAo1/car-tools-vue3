<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <router-view />
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

.amap-copyright {
  display: none!important;
  visibility:hidden!important;
}

.amap {
  width: 100vw;
  height: 100vh;
}


  html,
  body,
  #app {
    height: 100%;
    margin: 0;
  }

  html {
    font-size: calc(100vw / 3.75 / 2);
    text-align: left;
  }

  p {
    margin: 0;
    height: 0;
  }


  
.basePopup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 1000%;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
  text-align: center;
  width: 100%;
}
.basePopup.show {
  opacity: 1;
  left: 0;
}

.basePopup.show .content-pop{
  bottom: 0;
  position: absolute;
  width: 100%;
} 

.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
}
  
</style>
