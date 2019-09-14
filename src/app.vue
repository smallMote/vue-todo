<template>
  <div id="app">
    <div id="cover"></div>
    <Header/>
    <Todo/>
    <Footer/>
  </div>
</template>
<script>
import Todo from './todo/todo.vue'
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
export default {
  components: {
    Todo,
    Header,
    Footer
  },
  data() {
    return { 
      name: 'Larry'
    }
  }
}
</script>
<style lang="stylus" scoped>
#app{
    position absolute;
    left 0;
    right 0;
    top 0;
    bottom 0;
}
#cover{
    position absolute;
    left 0;
    top 0;
    right 0;
    bottom 0;
    background-color #cccccc;
    opacity .7;
    z-index -1;
}
</style>