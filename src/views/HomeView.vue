<template>
  <div class="home">
    <GameCanvas id="gameCanvas"/>
    <Leaderboard id="leaderboard" />
    <MyScore id="score"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCanvas from '@/components/GameCanvas.vue'
import MyScore from '@/components/myScore.vue'
import Leaderboard from '@/components/Leaderboard.vue'

export default {
  name: 'HomeView',
  components: {
    GameCanvas,
    MyScore,
    Leaderboard
  }
}
</script>

<style scoped>
#score {
  position: absolute;
  top: 5%;
  right: 5%;
}

#leaderboard {
  position: absolute;
  top: 5%;
  left: 5%;
}
</style>
