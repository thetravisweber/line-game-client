<template>
  <div class="home">
    <GameCanvas id="gameCanvas"/>
    <Leaderboard id="leaderboard" />
    <MyScore id="score"/>
    <IntroductionModal v-if="!username" id="introduction-modal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCanvas from '@/components/GameCanvas.vue'
import MyScore from '@/components/myScore.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import IntroductionModal from '@/components/IntroductionModal.vue'

export default {
  name: 'HomeView',
  components: {
    GameCanvas,
    MyScore,
    Leaderboard,
    IntroductionModal
  },
  computed: {
    username() {
      return this.$store.getters.getUsername;
    }
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
