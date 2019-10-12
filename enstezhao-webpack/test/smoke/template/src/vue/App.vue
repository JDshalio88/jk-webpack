<template>
    <div>
        Hello world
    </div>
</template>

<script>
import logo from './images/logo.png';
import { sayBye } from './util/index';
import libraryTest from 'library-test-enstezhao';
import largeNumber from 'large-number';


console.log('libraryTest', largeNumber('33', '23'), libraryTest('33', '23'));
export default {
    name: 'app',
    data() {
        return {
            logo: logo
        };
    },
    created() {
        console.log(sayBye());
    }
};

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
