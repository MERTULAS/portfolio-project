<template>
  <div class="spinner-body" v-if="spinning">
    <div class="spinner-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    spinning: { type: Boolean, required: true },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.spinner-body {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-wrapper {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid green;
  border-radius: 2px;
  animation: tumbleSpinner 2s infinite alternate-reverse;
}

@keyframes tumbleSpinner {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.spinner-wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  background-color: green;
  animation: fillSpinner 1s infinite alternate-reverse;
}

@keyframes fillSpinner {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
