<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  
*{ box-sizing: border-box }
body{
  padding: 0;
  margin: 0;  
}

#app{
  display:flex;
  align-items: center;
  justify-content: center; 

  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 450px;
}
</style>
