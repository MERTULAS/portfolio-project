<template>
  <div>
    <canvas
      id="selector-archer"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script>
class CannonBall {
  constructor(componentData) {
    this.xPos = componentData.canvasWidth >> 1;
    this.yPos = componentData.canvasHeight - 100;
    this.componentData = componentData;
  }

  draw() {
    this.componentData.context.fillStyle = "green";
    this.componentData.context.beginPath();
    this.componentData.context.arc(this.xPos, this.yPos, 10, 0, 2 * Math.PI);
    this.componentData.context.fill();
  }

  update() {
    this.draw();
    this.componentData.fillStyle = "black"
    this.componentData.fillRect(
      0,
      0,
      this.componentData.canvasWidth,
      this.componentData.canvasHeight
    );
  }
}
export default {
  name: "SelectorArcher",
  data() {
    return {
      canvasHeight: 600,
      canvasWidth: 500,
      canvas: null,
      context: null,
      balls: [],
    };
  },
  mounted() {
    this.canvas = document.getElementById("selector-archer");
    this.context = this.canvas.getContext("2d");

    this.canvas.addEventListener("click", () => {
      this.createCannonBall();
    });
    // this.createCannonBall();
    requestAnimationFrame(this.animationLoop);
  },
  methods: {
    createCannonBall() {
      let cannonBall = new CannonBall(this);
      cannonBall.draw();
      this.balls.push(cannonBall);
    },
    animationLoop() {
      for (let ball in this.balls) {
        ball.update();
      }
    },
  },
  destroyed() {
    cancelAnimationFrame(this.animationLoop);
  },
};
</script>

<style>
#selector-archer {
  border: 1px solid red;
  float: right;
}
</style>
