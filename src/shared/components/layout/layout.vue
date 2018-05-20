<template>
    <div class="application__wrapper">
        <top-menu />

        <div class="application__container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TopMenu from './TopMenu'

export default {
  components: {
    TopMenu
  }
}
</script>
