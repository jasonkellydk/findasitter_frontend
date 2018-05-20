<template>
    <div id="app">
        <layout></layout>
    </div>
</template>
<script>
    import layout from '@/shared/components/layout/layout'
    export default {
      name: 'app',
      components: {
        layout
      },
      mounted () {
        this.$store.dispatch('user/findAllUsers')
      }
    }
</script>
<style lang="scss">
    @import 'shared/styles/index';
</style>
