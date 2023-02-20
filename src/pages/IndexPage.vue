<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <div class="page-body" v-if="!isSpinning">
      <div class="index-body">
        <h1 class="animated-text">{{ animatedText }}</h1>
        <p>
          Hello, I am a Software Developer working on various topics. I work on
          Frontend Web Technologies, Game Algorithms, Deep Learning and Computer
          Graphics.
        </p>
      </div>
    </div>
    <div class="vue-m-for-mert">
      <img src="../assets/logo.png" alt="vue-logo" class="vue-logo vue-1" />
      <img src="../assets/logo.png" alt="vue-logo" class="vue-logo vue-2" />
      <span class="animated-text"> </span>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "IndexPage",
  components: {
    Spinner,
  },
  data() {
    return {
      animatedText: "Welcome to my website",
      textAnimationTimer: null,
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

<style scoped>
.vue-logo {
  position: absolute;
  animation: vueLogoAnimationRotate 1s forwards;
  animation-delay: 2.1s;
}

.vue-2 {
  visibility: hidden;
  animation: vueLogoAnimationSlide 1s forwards;
  animation-delay: 3.2s;
}

@keyframes vueLogoAnimationRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

@keyframes vueLogoAnimationSlide {
  from {
    visibility: hidden;
    transform: translateX(0) rotate(180deg);
  }

  to {
    visibility: visible;
    transform: translateX(100%) rotate(180deg);
  }
}

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
  padding: 25px;
  border-radius: 20px;
  background-image: linear-gradient(
    135deg,
    rgba(134, 134, 134, 0.5),
    rgba(31, 31, 31, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  z-index: 99;
  user-select: none;
  pointer-events: none;
}

@media screen and (max-width: 765px) {
  .index-body h1 {
    font-size: 28px;
    min-height: 30px;
  }

  .index-body h1::after {
    content: "";
  }

  .index-body p {
    font-size: 16px;
  }
}
</style>
