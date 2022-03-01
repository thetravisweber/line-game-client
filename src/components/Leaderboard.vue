<template>
  <div>
    <ol>
      <li v-for="user in leaderboard" :key="user.s" class="lbrow">
        <h4 class="lbname">{{user.n}}</h4>
        <h4 class="lbdivider">:</h4>
        <h4 class="lbscore">{{user.s}}</h4>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    leaderboard() {
      return this.$store.getters.getLeaderboard;
    }
  }
}
</script>

<style scoped>
h4 {
  padding: 0;
  margin: 0;
  margin-left: 4px;
  display: inline;;
}

.lbrow {
  width: 12em;
}

.lbname {
  text-align:left;
  float: left;
  width: 6em;
}


.lbdivider {
  margin: auto;
  text-align: center;
}

</style>