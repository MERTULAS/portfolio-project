<template>
  <div>
    <canvas id="canvas" :width="size.width" :height="size.height"></canvas>
    <slot />
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
    this.xDir = Math.random() * 1 - 2;
    this.yDir = Math.random() * 1 - 2;
  }

  draw() {
    this.componentData.context.fillStyle = this.color;
    this.componentData.context.beginPath();
    this.componentData.context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
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
  name: "AnimationBackground",
  props: {
    pointCount: { type: Number, default: () => 0 },
    size: {
      type: Object,
      default: () => {
        return { width: 100, height: 500 };
      },
    },
  },
  data() {
    return {
      canvas: null,
      context: null,
      pointList: [],
      isEnteredDemosPage: false,
      mouseMoveListener: null,
    };
  },
  watch: {
    $route(val) {
      this.isEnteredDemosPage = val.name === "demos";
    },
    isEnteredDemosPage(val) {
      if (val) {
        window.addEventListener("mousemove", this.mouseMove);
      } else {
        window.removeEventListener("mousemove", this.mouseMove);
      }
    },
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
          if (manhattanDist < 150) {
            this.context.beginPath();
            this.context.strokeStyle = `rgba(0, 155, 0, ${
              (150 - manhattanDist) / 150
            })`;
            this.context.moveTo(point1.x, point1.y);
            this.context.lineTo(point2.x, point2.y);
            this.context.stroke();
          }
        }
      }
      requestAnimationFrame(this.animationLoop);
    },
    mouseMove(event) {
      // points will escape from the mouse and will develop various game effects...;
      this.pointList.forEach(point => {
        let dist = point.x - event.clientX + point.y - event.clientY;
        if (Math.abs(dist) <= 15) {
          point.x +=  dist;
          point.y += dist;
        }
      })
    },
  },
  mounted() {
    new QuadTree();
    // this.isEnteredDemosPage = this.$route.name === "demos";
    // this.mouseMoveListener = this.mouseMove;
    this.canvas = document.getElementById("canvas");
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
  destroyed() {
    cancelAnimationFrame(this.animationLoop);
  },
};
</script>

<style scoped>
#anim-canvas {
  background: black;
}

#canvas {
  position: absolute;
  left: 0;
  z-index: -1;
}
</style>
