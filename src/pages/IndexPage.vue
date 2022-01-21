<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <div class="page-body" v-if="!isSpinning">
      <AnimationBackground
        class="animated-bg-block"
        :pointCount="120"
        :size="{
          width: (pageWidth / 10 + pageWidth) >> 1,
          height: pageHeight - (navbarHeight + footerHeight),
        }"
      />
      <div class="index-body">
        <h1>{{ animatedText }}</h1>
        <p>
          Hello, I am a Software Developer working on various topics. I work on
          Frontend Web Technologies, Game Algorithms, Deep Learning and Computer
          Graphics.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AnimationBackground from "@/components/AnimationBackground.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "IndexPage",
  components: {
    AnimationBackground,
    Spinner,
  },
  data() {
    return {
      animatedText: "Welcome to my website",
      textAnimationTimer: null,
      navbarHeight: null,
      footerHeight: null,
      pageHeight: window.innerHeight,
      pageWidth: window.innerWidth,
      isSpinning: true,
    };
  },
  methods: {
    deleteCharFromLast() {
      return this.animatedText.slice(0, -1);
    },
    appendCharToLast(textBackup) {
      return this.animatedText + textBackup[this.animatedText.length];
    },
    textAnimation() {
      let textWritingStatus = false;
      let i = this.animatedText.length;
      let iIncrementer = -1;
      let animatedTextBackup = this.animatedText;
      this.textAnimationTimer = setInterval(() => {
        if (i === 0) {
          textWritingStatus = true;
          iIncrementer = 1;
        } else if (i === animatedTextBackup.length) {
          textWritingStatus = false;
          iIncrementer = -1;
        }
        this.animatedText = textWritingStatus
          ? this.appendCharToLast(animatedTextBackup)
          : this.deleteCharFromLast();
        i += iIncrementer;
      }, 100);
    },
    pageInitialize() {
      this.navbarHeight = document
        .querySelector(".navbar-menu")
        .getBoundingClientRect().height;
      this.footerHeight = document
        .querySelector(".footer")
        .getBoundingClientRect().height;

      this.isSpinning = false;
      this.textAnimation();
    },
  },
  mounted() {
    this.pageInitialize();
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

.animated-bg-block {
  float: right;
}

.index-body h1 {
  font-size: 45px;
  min-height: 67.5px;
  position: relative;
  width: fit-content;
}

.index-body p {
  font-size: 20px;
  max-width: 450px;
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
  width: 90vw;
  height: 65vh;
}
</style>
