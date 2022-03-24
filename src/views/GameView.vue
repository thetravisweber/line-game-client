<template>
  <div class="home">
    <GameCanvas id="gameCanvas"/>
    <Leaderboard id="leaderboard" />
    <GameStatBar id="stats"/>
    <IntroductionModal v-if="!username" id="introduction-modal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCanvas from '@/components/GameCanvas.vue'
import GameStatBar from '@/components/GameStatBar.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import IntroductionModal from '@/components/IntroductionModal.vue'

export default {
  name: 'GameView',
  components: {
    GameCanvas,
    GameStatBar,
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
#stats {
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
