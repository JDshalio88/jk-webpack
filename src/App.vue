<template>
    <div>
        Hello world
        <img :src="logo"/>
    </div>
</template>

<script>
import logo from './assets/images/logo.png';
export default {
    data() {
        return {
            logo: logo
        }
    },
    name: "app"
}
</script>

<style>
 div {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
</style>
