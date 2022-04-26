<template>
  <vue-p5 v-on="{setup, draw, keypressed, mouseclicked}"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  
  data: function () {
    // 1k per second
    return {
      currentPrice: 100,
      prices: [],
      TIME_SPAN: 30000, // in ms (how long to keep records)
      p5: null,
      connection: null,
      viewWindow: {
        "min": 0,
        "max": 200
      },
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
      this.updateViewWindow();
    },

    draw(p) {
      p.background(255);
      p.stroke(150);
      p.strokeWeight(4);

      this.drawBackgroundLines(p);

      p.stroke(0);
      p.noFill();
      p.beginShape();
      p.vertex(0, this.mapPrice(this.prices[0].price));
      const now = Date.now();
      this.prices.forEach(priceBlock => {
        p.vertex(
          p.width-2 - (p.width * ((now - priceBlock.time)/this.TIME_SPAN)),
          this.mapPrice(priceBlock.price)
        );
      });
      p.vertex(p.width, this.mapPrice(this.currentPrice));
      p.endShape();

      this.updateViewWindow();
      this.removeOldPriceBlocks();
    },

    drawBackgroundLines(p) {
      let jump = 100;
      let spread = this.spread();
      if (spread > 22000) {
        jump = 10000;
      } else if (spread > 2200) {
        jump = 1000;
      }
      
      let lineMarks = [];
      for (let offset = this.viewWindow.min; offset < this.viewWindow.max; offset+=jump) {
        lineMarks.push(p.round(offset / jump) * jump);
      }
      p.textSize(30);
      lineMarks.forEach(price => {
        const mapped = this.mapPrice(price);
        p.text(price, p.width - 100, mapped-20);
        p.line(0, mapped, p.width, mapped);
      });
    },

    mapPrice (price) {
      return this.p5.map(price, this.viewWindow.min, this.viewWindow.max, this.p5.height, 0);
    },

    addPrice (price) {
      this.currentPrice = price;
      this.prices.push({
        price: this.currentPrice,
        time: Date.now(),
      });
    },

    updateViewWindow() {
      let recommendedSpread = this.spread();
      if (this.currentPrice > this.viewWindow.max - recommendedSpread/4) {
        let highGoal = this.currentPrice + recommendedSpread/4;
        let lowGoal = this.currentPrice - 3*recommendedSpread/4;
        this.larpToGoal(highGoal, lowGoal);
      }
      if (this.currentPrice < this.viewWindow.min + recommendedSpread/4) {
        let highGoal = this.currentPrice + 3*recommendedSpread/4;
        let lowGoal = this.currentPrice - recommendedSpread/4;
        this.larpToGoal(highGoal, lowGoal);
      }
    },

    spread() {
      return 200 + this.p5.abs(this.currentPrice / 2.5);
    },

    larpToGoal(highGoal, lowGoal) {
      this.viewWindow.max += (highGoal - this.viewWindow.max) / 10;
      this.viewWindow.min += (lowGoal - this.viewWindow.min) / 10;
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
      switch (e.key) {
        case "ArrowUp":
        case "b":
          console.log("buying");
          this.sendMessage("b");
          break;
        case "ArrowDown":
        case "s":
          console.log("shorting");
          this.sendMessage("s");
          break;
        case "t":
          console.log(this.prices);
          console.log(this.viewWindow.min + " - " + this.viewWindow.max);
          break;
        case "c":
          console.log(this.conn);
          break;
      }
    },

    mouseclicked() {
      // if not likely to be a mobile device
      if (this.p5.width > 1200) return;
      // top of screen
      if (this.p5.mouseY < this.p5.height * .4) {
        console.log("buying");
        this.sendMessage("b");
      } 
      // bottom of screen
      else if (this.p5.mouseY > this.p5.height * .6) {
        console.log("shorting");
        this.sendMessage("s");
      }
    },

    sendMessage: function (message) {
      if (!!this.username) {
        this.connection.send(message);
      }
    },

    messageRecieved (message) {
      const parsed = JSON.parse(message.data);

      if (!!parsed.p) {
        this.addPrice(parsed.p);
        this.$store.commit("updateCurrentPrice", parsed.p);
      }
      if (!!parsed.l) {
        this.$store.commit("updateLeaderboard", parsed.l);
      }
      if (!!parsed.s) {
        this.$store.commit("updateMyScore", parsed.s);
      }
      if (!!parsed.n) {
        this.$store.commit("updateUsername", parsed.n);
      }
      if (!!parsed.sum) {
        // console.log(parsed.sum);
        this.$store.commit("updateMyOwns", parsed.sum.own);
        this.$store.commit("updateMyOrders", parsed.sum.orders);
      }
    }
  },

  created: function() {
    console.log("Starting connection");
    this.connection = new WebSocket(process.env.VUE_APP_WS_URL);

    this.connection.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to Websocket Server");
    }

    this.connection.onmessage = this.messageRecieved;

    this.$store.commit("setConnection", this.connection);
  },

  computed: {
    username() {
      return this.$store.getters.getUsername;
    }
  }
};
</script>

<style scoped>
#p5Canvas {
  margin: 0px;
}
</style>
