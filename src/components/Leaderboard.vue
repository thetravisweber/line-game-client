<template>
  <div>
    <ol>
      <li v-for="(user, index) in leaderboard" :key="index" class="lbrow">
        <h4 class="lbname">{{leftJustified(user.n, 10)}}</h4>
        <h4 class="lbdivider">:</h4>
        <h4 class="lbscore">{{Math.round(user.s, 2)}}</h4>
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
  },
  methods: {
    leftJustified(name, width) {
      return name + "".repeat(width - name.length);
    }
  }
}
</script>

<style scoped>
h4 {
  padding: 0;
  margin: 0;
  margin-left: 4px;
  display: inline;
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