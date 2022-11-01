<template lang="pug">
#app
  main-layout
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
export default {
  name: 'App',
  components: { MainLayout },
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
body
  margin: 0
</style>
