<template>
  <div>
    <canvas id="canvas" :width="size.width" :height="size.height"></canvas>
  </div>
</template>

<script>
class QuadTree {
  constructor() {
    // QuadTree will be implemented.
  }
}

class Point {
  constructor(x, y, color, componentObject) {
    [this.x, this.y, this.color, this.componentData] = [
      x,
      y,
      color,
      componentObject,
    ];
    this.xDir = Math.random() * 2 - 4;
    this.yDir = Math.random() * 2 - 4;
  }

  draw() {
    this.componentData.context.fillStyle = this.color;
    this.componentData.context.beginPath();
    this.componentData.context.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    this.componentData.context.fill();
  }

  update() {
    this.xDir *= this.x > this.componentData.size.width || this.x < 0 ? -1 : 1;
    this.yDir *= this.y > this.componentData.size.height || this.y < 0 ? -1 : 1;
    this.x += this.xDir;
    this.y += this.yDir;
    this.draw();
  }
}

export default {
  props: {
    pointCount: { type: Number, default: () => 0 },
    size: {
      type: Object,
      default: () => {
        return { width: "100%", height: "500px" };
      },
    },
  },
  name: "AnimationBackground",
  data() {
    return {
      canvasWidth: window.innerWidth,
      canvasHeight: null,
      canvas: null,
      context: null,
      cube: null,
      pointList: [],
    };
  },
  methods: {
    animationLoop() {
      this.context.fillStyle = "rgba(0, 0, 0, .8)";
      this.context.fillRect(0, 0, this.size.width, this.size.height);
      for (let point of this.pointList) {
        point.update();
      }

      for (let point1 of this.pointList) {
        for (let point2 of this.pointList) {
          let manhattanDist =
            Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
          if (manhattanDist < 200) {
            this.context.beginPath();
            this.context.strokeStyle = `rgba(0, 155, 0, ${
              (200 - manhattanDist) / 200
            })`;
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
    this.canvas = document.getElementById("canvas");
    this.canvas.innerWidth = window.innerWidth;
    this.canvas.innerHeight = window.innerHeight;

    this.canvasHeight = this.canvas.getBoundingClientRect().height;

    this.context = this.canvas.getContext("2d");

    for (let i = 0; i < this.pointCount; i++) {
      this.pointList.push(
        new Point(
          Math.floor(Math.random() * (this.size.width - 10)),
          Math.floor(Math.random() * (this.size.height - 10)),
          "green",
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
