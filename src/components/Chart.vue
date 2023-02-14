<template>
  <div
    class="chart-wrapper"
    :style="`width: ${width !== 0 ? width + 'px' : '100%'}`"
  >
    <div class="y-axis" :height="height">
      <div
        class="y-axis-steps"
        v-for="step in Array.from(
          { length: miniChart ? 2 : (yMax - yMin) / 10 + 1 },
          (_, i) => (yMin + miniChart ? i * yMax : i * ((yMax - yMin) / 10))
        ).reverse()"
        :key="step"
      >
        {{ step }}
      </div>
    </div>
    <div class="chart" :style="`height: ${height}px`">
      <div
        v-for="(bar, index) in Object.keys(dataSource)"
        class="bar"
        :key="index"
        :style="`width: ${
          chartWrapper.width / (Object.keys(dataSource).length + 3)
        }px; height: ${(height * dataSource[bar]) / 100}px; background-color: ${
          randomColors ? randomBackgroundColor() : barColors[bar]
        }`"
      >
        <p v-if="(height * dataSource[bar]) / 100 >= 34">
          %{{ dataSource[bar] }}
        </p>
        <div class="bar-info">%{{ dataSource[bar] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    dataSource: { type: Object, default: () => {} },
    height: { type: Number, default: () => 100 },
    width: { type: Number, default: () => 0 },
    randomColors: { type: Boolean, default: () => false },
    barColors: { type: Object, default: () => {} },
    yMin: { type: Number, default: () => 0 },
    yMax: { type: Number, default: () => 100 },
    miniChart: { type: Boolean, default: () => false },
  },
  data() {
    return {
      chartWrapper: {},
    };
  },
  mounted() {
    this.chartWrapper = this.$el.getBoundingClientRect();
  },
  updated() {
    this.createXAxis();
  },
  methods: {
    randomBackgroundColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
    createXAxis() {
      this.$el.querySelectorAll(`.bar`).forEach((bar, index) => {
        bar.setAttribute("data-lang", Object.keys(this.dataSource)[index]);
      });
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  display: flex;
}

.chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  background-image: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.5),
    rgba(33, 33, 33, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  border-radius: 5px;
}

.bar {
  height: 0;
  transition: 1s;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.bar:hover {
  transform: scale(1.1);
}

.bar:hover .bar-info {
  visibility: visible;
}

.bar p {
  margin: 5px 0;
  font-size: 15px;
  color: black !important;
  font-weight: bolder;
}

.bar::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40vh;
  width: 100%;
  border: 1px dashed rgba(160, 160, 160, 0.3);
  border-top: none;
}

.bar::after {
  content: attr(data-lang);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50px) rotate(-45deg);
  font-weight: 500;
}

.bar-info {
  background-color: rgb(139, 139, 139);
  padding: 10px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translate(-50%, -30px);
  border-radius: 4px;
  visibility: hidden;
  transition: 0.5s;
}

.y-axis {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.y-axis-steps {
  position: relative;
  width: 25px;
  transform: translateY(50%);
  font-weight: 500;
}

.y-axis-steps::before {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(110%, -50%);
  width: 15px;
  height: 2px;
  background-color: teal;
}
</style>
