<template>
  <!-- <vue-p5 @sketch="sketch"></vue-p5> -->
  <vue-p5 v-on="{setup, draw}"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  
  data: function () {
    let startPrice = 100;
    const MAX_PRICE_HISTORY = 150;
    let prices = [];
    let base = {
      price: startPrice,
      time: Date.now(),
    };
    for (let i = 0; i < MAX_PRICE_HISTORY; i++) {
      prices[i] = base;
    }
    return {
      currentPrice: startPrice,
      prices: prices,
      TIME_WIDTH: 60,
      MAX_PRICE_HISTORY: MAX_PRICE_HISTORY,
      nextPrice: startPrice,
    };
  },

  components: {
    VueP5,
  },

  methods: {
    setup(sketch) {
      sketch.createCanvas(200, 200);
      sketch.background(200, 200, 200);
    },

    draw(sk) {
      // draw a line between the previous
      // and the current mouse position
      sk.line(sk.pmouseX, sk.pmouseY, sk.mouseX, sk.mouseY);
    },

    mapPrice: function (price) {
      return map(price, 0, 200, height, 0);
    },

    addPrice: function () {
      this.currentPrice += random(-1, 1);
      prices.push({
        price: this.currentPrice,
        time: Date.now(),
      });
      if (prices.length > MAX_PRICE_HISTORY) {
        prices = prices.slice(-1 * MAX_PRICE_HISTORY);
      }
    },

    keyPressed: function (e) {
      switch (e.key) {
        case "b":
          this.currentPrice += 10;
          break;
        case "s":
          this.currentPrice -= 10;
          break;
      }
    },
  },

};
</script>

<style scoped>
#p5Canvas {
  margin: 0px;
}
</style>
