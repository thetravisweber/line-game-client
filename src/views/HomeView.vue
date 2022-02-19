<template>
  <div class="home">
    <GameCanvas id="gameCanvas"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCanvas from '@/components/GameCanvas.vue'

export default {
  name: 'HomeView',
  components: {
    GameCanvas
  }
}
</script>

<style scoped>

</style>
