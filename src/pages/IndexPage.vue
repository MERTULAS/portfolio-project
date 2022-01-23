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
        <div class="progress-container">
          <div
            v-for="(loader, index) in progressBars"
            :key="index"
            class="progress"
          >
            <span class="title timer">
              {{ loader.percentage }} %
              <p>{{ loader.text }}</p>
            </span>
            <div class="overlay"></div>
            <div
              class="left"
              :style="`transform: rotate(var(--loader${index + 1}-left-degree));
  z-index: var(--z-index${index + 1}-left);`"
            ></div>
            <div
              class="right"
              :style="`transform: rotate(var(--loader${
                index + 1
              }-right-degree));`"
            ></div>
          </div>
        </div>
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
      progressBars: [
        { percentage: 0, limit: 100, text: "POWER1" },
        { percentage: 0, limit: 92, text: "POWER2" },
      ],
    };
  },
  methods: {
    deleteCharFromLast() {
      return this.animatedText.slice(0, -1);
    },
    appendCharToLast(textBackup) {
      return this.animatedText + textBackup[this.animatedText.length];
    },
    progressBarLoader() {
      for (let i = 0; i < this.progressBars.length; i++) {
        document.documentElement.style.setProperty(
          `--loader${i + 1}-left-degree`,
          "0deg"
        );
        document.documentElement.style.setProperty(`--z-index${i + 1}-left`, 0);
      }
      for (let i = 0; i < this.progressBars.length; i++) {
        let loaderInterval = setInterval(() => {
          this.progressBars[i].percentage++;
          if (this.progressBars[i].percentage === this.progressBars[i].limit) {
            clearInterval(loaderInterval);
          }
          if (this.progressBars[i].percentage <= 50) {
            document.documentElement.style.setProperty(
              `--loader${i + 1}-right-degree`,
              `${3.6 * this.progressBars[i].percentage}deg`
            );
          } else {
            document.documentElement.style.setProperty(
              `--loader${i + 1}-left-degree`,
              `${3.6 * this.progressBars[i].percentage}deg`
            );
            document.documentElement.style.setProperty(
              `--z-index${i + 1}-left`,
              100
            );
          }
        }, 1);
      }
    },
    textAnimation() {
      let textWritingStatus = false;
      let iIncrementer = -1;
      let animatedTextBackup = this.animatedText;
      // let i = this.animatedText.length;
      let i = 0;
      this.animatedText = "";
      this.textAnimationTimer = setInterval(() => {
        if (i === 0) {
          textWritingStatus = true;
          iIncrementer = 1;
        } else if (i === animatedTextBackup.length) {
          clearInterval(this.textAnimationTimer);
          textWritingStatus = false;
          // iIncrementer = -1;
          iIncrementer = -1;
          return;
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
      this.progressBarLoader();
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
  animation: blink 0.5s infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.index-body {
  position: absolute;
  left: 5vw;
  top: 15vh;
  width: 90vw;
  height: 65vh;
}

.progress-container {
  display: flex;
}

.progress {
  width: 200px;
  height: 200px;
  font-size: 30px;
  color: #fff;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background-color: #07070c;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.progress .title {
  z-index: 999;
}

.progress .title p {
  font-size: 14px;
}

.progress .overlay,
.progress .left,
.progress .right {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.progress .overlay {
  z-index: 10;
  background-color: #07070c;
}

.progress .left,
.progress .right {
  border: 10px double green;
  transform-origin: right;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-right: none;
}
</style>
