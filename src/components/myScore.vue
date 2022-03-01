<template>
  <div id="myScore">
    <h2>{{score}}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    score() {
      return this.$store.getters.getMyScore;
    }
  }
}
</script>

<style>

</style>