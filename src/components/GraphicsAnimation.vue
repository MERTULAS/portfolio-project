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
class Point {
  constructor(x, y, color, context) {
    [this.x, this.y, this.color, this.context] = [x, y, color, context];
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    this.context.fill();
  }

  update() {
    this.draw();
  }
}

class Line {
  constructor(color, context, ...points) {
    [this.color, this.context, this.points] = [color, context, points];
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(this.points[0], this.points[1]);
    this.context.lineTo(this.points[2], this.points[3]);
    this.context.stroke();
  }

  update() {
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
      pointList: [],
    };
  },
  methods: {
    animationLoop() {
      for (let point of this.pointList) {
        point.x += Math.floor((Math.random() * 2 - 1) * 10);
        point.y += Math.floor((Math.random() * 2 - 1) * 10);
        point.update();
      }
      requestAnimationFrame(this.animationLoop);
    },
  },
  mounted() {
    let canvas = document.getElementById("anim-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    this.navbarHeight = document
      .querySelector(".navbar-menu")
      .getBoundingClientRect().height;
    this.footerHeight = document
      .querySelector(".footer")
      .getBoundingClientRect().height;

    new Line("red", ctx, 5, 6, 10, 12);

    for (let i = 0; i < this.pointCount; i++) {
      this.pointList.push(
        new Point(
          Math.floor(Math.random() * (window.innerWidth - 10)),
          Math.floor(Math.random() * (window.innerHeight - 10)),
          "brown",
          ctx
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
