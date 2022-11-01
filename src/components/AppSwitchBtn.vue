<template lang="pug">
.app-switch-btn
  .app-btn--label-before °F
  label.btn--switch
    input(type="checkbox" v-model="_isCelsius" checked)
    span.btn--slider
  .app-btn--label-after °C
</template>

<script>
export default {
  name: "AppSwitchBtn",
  props: { isCelsius: Boolean },
  computed: {
    _isCelsius: {
      get() { return this.isCelsius },
      set(val) { return this.$emit('update:isCelsius', val) }
    }
  }
}
</script>

<style lang="sass" scoped>
.app-switch-btn
  display: flex
  .btn--switch
    position: relative
    display: inline-block
    width: 60px
    height: 34px
    .btn--slider
      position: absolute
      cursor: pointer
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: $purple
      -webkit-transition: .4s
      transition: .4s
    .btn--slider:before
      position: absolute
      content: ""
      height: 26px
      width: 26px
      left: 4px
      bottom: 4px
      background-color: white
      -webkit-transition: .4s
      transition: .4s
    input:checked + .btn--slider
      background-color: $green
    input:focus + .btn--slider
      box-shadow: 0 0 1px $green
    input:checked + .btn--slider:before
      -webkit-transform: translateX(26px)
      -ms-transform: translateX(26px)
      transform: translateX(26px)
    .btn--slider
      border-radius: 34px
    .btn--slider:before
      border-radius: 50%
  .btn--switch input
    opacity: 0
    width: 0
    height: 0
  .app-btn--label-before
    padding-right: 10px
  .app-btn--label-after
    padding-left: 10px
  .app-btn--label-before, .app-btn--label-after
    font-size: 20px
    font-weight: 600
</style>