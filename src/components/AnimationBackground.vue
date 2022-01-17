<template>
  <div>
    <canvas
      id="anim-canvas"
      :style="`width: 100%; height: calc(100vh - ${
        navbarHeight + footerHeight
      }px`"
    ></canvas>
  </div>
</template>

<script>
class QuadTree {
  constructor () {
    // QuadTree will be implemented.
  }
}

class Point {
  constructor(x, y, color, componentObject) {
    [this.x, this.y, this.color, this.componentData] = [x, y, color, componentObject];
    this.xDir = Math.random() * 5;
    this.yDir = Math.random() * 5;
  }

  draw() {
    this.componentData.context.fillStyle = this.color;
    this.componentData.context.beginPath();
    this.componentData.context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    this.componentData.context.fill();
  }

  update() {
    this.xDir *= this.x > this.componentData.canvasWidth || this.x < 0 ? -1 : 1;
    this.yDir *= this.y > this.componentData.canvasHeight || this.y < 0 ? -1 : 1;
    this.x += this.xDir;
    this.y += this.yDir;
    this.draw();
  }
}

export default {
  props: {
    pointCount: { type: Number, default: () => 0 },
    size: { type: String, default: () => "full" },
  },
  data() {
    return {
      navbarHeight: null,
      footerHeight: null,
      canvasWidth: window.innerWidth,
      canvasHeight: null,
      canvas: null,
      context: null,
      pointList: [],
    };
  },
  methods: {
    animationLoop() {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let point of this.pointList) {
        point.update();
      }
  
      
      for (let point1 of this.pointList) {
        for (let point2 of this.pointList) {
          let manhattanDist = Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
          if ( manhattanDist < 300 ) {
            this.context.beginPath();
            this.context.strokeStyle = `rgba(200, 0, 0, ${100 / (1000 - manhattanDist)})`;
            this.context.moveTo(point1.x, point1.y);
            this.context.lineTo(point2.x, point2.y);
            this.context.stroke();
          }
      }
      }
      requestAnimationFrame(this.animationLoop);
    },
  },
  mounted() {
    new QuadTree();
    this.canvas = document.getElementById("anim-canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvasHeight = this.canvas.getBoundingClientRect().height;
    this.context = this.canvas.getContext("2d");

    this.navbarHeight = document
      .querySelector(".navbar-menu")
      .getBoundingClientRect().height;
    this.footerHeight = document
      .querySelector(".footer")
      .getBoundingClientRect().height;

    for (let i = 0; i < this.pointCount; i++) {
      this.pointList.push(
        new Point(
          Math.floor(Math.random() * (window.innerWidth - 10)),
          Math.floor(Math.random() * (window.innerHeight - 10)),
          "brown",
          this
        )
      );
    }

    this.animationLoop();
  },
};
</script>

<style scoped>
#anim-canvas {
  background: black;
}
</style>
