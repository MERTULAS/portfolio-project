<template>
  <div class="chart-wrapper">
    <canvas id="pie-chart"></canvas>
    <div class="project-languages">
      <div
        v-for="language in Object.keys(dataSource)"
        class="project-language"
        :key="language"
      >
        <div
          class="language-marker"
          :style="`background-color: ${barColors[language]}`"
        />
        <p class="language-name">{{ language }}</p>
        <p class="language-percentage">(%{{ dataSource[language] }})</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  props: {
    dataSource: { type: Object, default: () => {} },
    randomColors: { type: Boolean, default: () => false },
    barColors: { type: Object, default: () => {} },
    miniChart: { type: Boolean, default: () => false },
  },
  data() {
    return {
      chartWrapper: {},
      canvas: null,
      ctx: null,
      canvasWidth: 0,
      canvasHeight: 0,
    };
  },
  mounted() {
    this.canvas = this.$el.querySelector("#pie-chart");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.$el.getBoundingClientRect().height;
    this.canvasHeight = this.$el.getBoundingClientRect().height;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.createPie();
  },
  methods: {
    randomBackgroundColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
    createPie() {
      let beginRadian = 0;
      let endRadian = 0;
      Object.keys(this.dataSource).forEach((data) => {
        this.ctx.beginPath();

        endRadian = (this.dataSource[data] / 100) * Math.PI * 2;
        beginRadian;
        this.ctx.fillStyle = this.barColors[data];
        this.ctx.arc(
          this.canvasWidth >> 1,
          this.canvasHeight >> 1,
          this.canvasWidth >> 1,
          beginRadian,
          endRadian + beginRadian
        );

        this.ctx.lineTo(this.canvasWidth >> 1, this.canvasHeight >> 1);

        beginRadian += endRadian;
        this.ctx.fill();
        this.ctx.stroke();
      });
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.project-languages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.project-language {
  display: flex;
  align-items: center;
  margin: 5px;
}

.language-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.project-language p {
  margin: 0 0 0 5px;
}
</style>
