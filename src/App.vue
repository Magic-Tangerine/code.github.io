<template>
  <div id="app">
    <Invagation></Invagation>
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './components/Main'
import AddBlog from './components/AddBlog'
import Invagation from './components/Invagation'
import Person from './components/Person'
import Article from './components/Article'


export default {
  name: 'App',
  components: {
    Main,AddBlog,Invagation,Person,Article
  }
}
</script>

<style>
#app{
  overflow-x: hidden;
}

a{
  text-decoration: none;
}
a:visited{
  color: black;
}

a:hover{
  color: #409EFF;
}
</style>
