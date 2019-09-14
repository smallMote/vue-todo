<template>
  <div class="real-app">
    <input 
      type="text" 
      class="add-input" 
      autofocus
      placeholder="Doing something?"
      @keyup.enter="addTodo">
      <Item 
        v-for="todo in filterTodos"
        :todo="todo"
        :key="todo.id"
        @del="deleteTodo"/>
      <Tabs 
        :filter="filter"
        :todos="todos"
        @toggle="toggleFilter"
        @clearAllCompleted="clearAllCompleted"/>
  </div>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let count = 0;
export default {
  components: {
    Item,
    Tabs
  },
  data() {
    return {
      filter: 'all',
      todos: []
    }
  },
  methods: {
    addTodo(e) {
      let content = e.target.value.trim();
      if (content) {
        this.todos.unshift({
          id: count++,
          content,
          completed: false
        });
        e.target.value = '';
      }
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    filterTodos() {
      const completed = this.filter === 'completed';
      return this.filter === 'all' ? 
        this.todos : this.todos.filter(todo => completed === todo.completed)
    }
  }
}
</script>
<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>