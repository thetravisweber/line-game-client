<template>
  <!-- <vue-p5 @sketch="sketch"></vue-p5> -->
  <vue-p5 v-on="{setup, draw}"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  
  data: function () {
    let startPrice = 100;
    const MAX_PRICE_HISTORY = 400;
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
      p5: null
    };
  },

  components: {
    VueP5,
  },

  methods: {
    setup(sketch) {
      this.p5 = sketch;
      sketch.createCanvas(
        sketch.windowWidth,
        sketch.windowHeight
      );
      sketch.background(200, 200, 200);
      sketch.frameRate(60);
    },

    draw(p) {
      p.background(255);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(0, p.height/2, p.width, p.height/2);

      p.stroke(0);
      p.noFill();
      p.beginShape();
      p.vertex(0, this.mapPrice(this.prices[0].price));
      this.prices.forEach((priceStamp, index) => {
        p.curveVertex(
          p.width * ((index/(this.MAX_PRICE_HISTORY-2))),
          this.mapPrice(priceStamp.price)
        );
      });
      p.endShape();

      this.addPrice();  
    },

    mapPrice: function (price) {
      return this.p5.map(price, 0, 200, this.p5.height, 0);
    },

    addPrice: function () {
      this.currentPrice += this.p5.random(-1, 1);
      this.prices.push({
        price: this.currentPrice,
        time: Date.now(),
      });
      if (this.prices.length > this.MAX_PRICE_HISTORY) {
        this.prices = this.prices.slice(-1 * this.MAX_PRICE_HISTORY);
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
