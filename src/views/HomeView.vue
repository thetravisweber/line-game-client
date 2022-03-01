<template>
  <div class="home">
    <GameCanvas id="gameCanvas"/>
    <MyScore id="score"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCanvas from '@/components/GameCanvas.vue'
import MyScore from '@/components/myScore.vue'

export default {
  name: 'HomeView',
  components: {
    GameCanvas,
    MyScore
  }
}
</script>

<style scoped>
#score {
  position: absolute;
  top: 5%;
  right: 5%;
}
</style>
