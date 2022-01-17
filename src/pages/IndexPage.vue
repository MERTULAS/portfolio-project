<template>
  <div>
    <AnimationBackground :pointCount="100" />
    <div class="index-body">
      <h1>Welcome to my website</h1>
    </div>
  </div>
</template>

<script>
import AnimationBackground from "@/components/AnimationBackground.vue";

export default {
  name: "IndexPage",
  components: {
    AnimationBackground,
  },
  data() {
    return {
      animatedTextBackup: null,
      textAnimationTimer: null,
    };
  },
  methods: {
    deleteCharFromLast(text) {
      return text.slice(0, -1);
    },
    appendCharToLast(text) {
      return text + this.animatedTextBackup[text.length];
    },
  },
  mounted() {
    let animatedText;
    [animatedText, this.animatedTextBackup] = Array(2).fill(
      document.querySelector(".index-body h1").innerText
    );
    let textWritingStatus = false;
    let i = animatedText.length;
    let iIncrementer = -1;
    this.textAnimationTimer = setInterval(() => {
      document.querySelector(".index-body h1").innerText = animatedText;
      if (i === 0) {
        textWritingStatus = true;
        iIncrementer = 1;
      } else if (i === this.animatedTextBackup.length) {
        textWritingStatus = false;
        iIncrementer = -1;
      }
      animatedText = textWritingStatus
        ? this.appendCharToLast(animatedText)
        : this.deleteCharFromLast(animatedText);
      i += iIncrementer;
    }, 100);
  },
  destroyed() {
    clearInterval(this.textAnimationTimer);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-body * {
  color: white;
}

.index-body h1 {
  font-size: 45px;
  position: relative;
}

.index-body h1::after {
  content: "";
  position: absolute;
  top: 0;
  right: -15px;
  height: 100%;
  width: 2px;
  background-color: green;
}

.index-body {
  position: absolute;
  left: 5vw;
  top: 15vh;
}
</style>
