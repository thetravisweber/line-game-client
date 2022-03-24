<template>
  <div id="myScore">
    <h2>My Profit: ${{score.toFixed(2)}}</h2>
    <h2>Current Price: ${{price.toFixed(2)}}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    score() {
      return this.$store.getters.getMyScore;
    },
    price() {
      return this.$store.getters.getCurrentPrice;
    }
  }
}
</script>

<style>

</style>