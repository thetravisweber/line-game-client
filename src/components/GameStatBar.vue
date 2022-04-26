<template>
  <div id="myScore">
    <h4>Buy Orders: {{orders}}</h4>
    <h4>Own: {{own}}</h4>
    <h4>Price: ${{price.toFixed(2)}}</h4>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters.getMyOrders;
    },
    own() {
      return this.$store.getters.getMyOwns;
    },
    price() {
      return this.$store.getters.getCurrentPrice;
    }
  }
}
</script>

<style>

</style>