<template>
  <vue-p5 v-on="{setup, draw, keypressed}"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  
  data: function () {
    // 1k per second
    const TIME_SPAN = 30000; // in ms
    let prices = [];
    prices[0] = {
      price: 100,
      time: Date.now(),
    };
    return {
      currentPrice: 100,
      prices: prices,
      TIME_SPAN: TIME_SPAN,
      p5: null,
      connection: null,
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
      sketch.frameRate(25);
    },

    draw(p) {
      p.background(255);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(0, p.height/2, p.width, p.height/2);

      p.stroke(0);
      p.noFill();
      p.beginShape();
      if (this.prices.length == 0) {
        console.log("no prices");
        return;
      }
      p.vertex(0, this.mapPrice(this.prices[0].price));
      let now = Date.now();
      this.prices.forEach(priceBlock => {
        p.vertex(
          p.width-5 - (p.width * ((now - priceBlock.time)/this.TIME_SPAN)),
          this.mapPrice(priceBlock.price)
        );
      });
      p.vertex(p.width, this.mapPrice(this.currentPrice));
      p.endShape();

      this.removeOldPriceBlocks();
    },

    mapPrice (price) {
      return this.p5.map(price, 0, 200, this.p5.height, 0);
    },

    addPrice (price) {
      this.currentPrice = price;
      this.prices.push({
        price: this.currentPrice,
        time: Date.now(),
      });
    },

    tagCurrentPrice () {
      this.addPrice(this.currentPrice);
    },

    removeOldPriceBlocks () {
      let cutOff = Date.now() - this.TIME_SPAN;
      if (this.prices[0].time > cutOff) {
        return;
      }
      let lastOldPriceIndex = 0;
      for (let i = 0; i < this.prices.length; i++) {
        if (this.prices[i].time > cutOff) {
          break;
        }
        lastOldPriceIndex = i;
      }
      this.prices.splice(0, lastOldPriceIndex);
    },

    keypressed (e) {
      console.log("key got pressed");
      switch (e.key) {
        case "b":
          console.log("buying");
          this.sendMessage("b");
          break;
        case "s":
          console.log("shorting");
          this.sendMessage("s");
          break;
        case "t":
          console.log(this.prices);
          break;
      }
    },

    sendMessage: function (message) {
      this.connection.send(message);
    },

    messageRecieved (message) {
      const parsed = JSON.parse(message.data);

      if (!isNaN(parsed.p)) {
        this.tagCurrentPrice();
        this.addPrice(parsed.p);
      } else {
        console.log("is not an integer");
      }
      console.log(parsed.l);
      this.$store.commit("updateMyScore", parsed.s);
    }
  },

  created: function() {
    console.log("Starting connection");
    this.connection = new WebSocket("ws://localhost:7071");

    this.connection.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to Websocket Server");
    }

    this.connection.onmessage = this.messageRecieved;
  }
};
</script>

<style scoped>
#p5Canvas {
  margin: 0px;
}
</style>
