<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <div class="page-body" v-if="!isSpinning">
      <div class="index-body">
        <div>
          <h1 class="animated-text">
            <span
              v-for="(character, index) in animatedText.split('')"
              :key="index"
              >{{ character }}
            </span>
          </h1>
          <p>Hello, I am a Software Developer</p>
        </div>
        <ul class="techs">
          <li
            v-for="tech in [
              'Web Technologies',
              'Game Algorithms',
              'Deep Learning',
              'Computer Graphics',
            ]"
            :key="tech"
          >
            {{ tech }}
          </li>
        </ul>
      </div>
      <div class="vue-m-for-mert">
        <img src="../assets/logo.png" alt="vue-logo" class="vue-logo vue-1" />
        <img src="../assets/logo.png" alt="vue-logo" class="vue-logo vue-2" />
        <span class="animated-text"> </span>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import customCursorAnimation from "../utils/utils.js";

export default {
  name: "IndexPage",
  components: {
    Spinner,
  },
  data() {
    return {
      animatedText: "Welcome  to  my  website",
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
  updated() {
    document.querySelectorAll(".animated-text span").forEach((span) => {
      customCursorAnimation(span);
    });
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
.vue-m-for-mert {
  opacity: 0.4;
}
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

.animated-text span {
  display: inline-block;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  transition: 0.5s;
  transform: translate(0) scale(1);
}
.animated-text span:hover {
  /* transform: scale(1.2) translateY(-10%); */
  /* border: 1px solid green; */
  /* border-radius: 5px; */
  animation: bounceAnimation 0.2s ease-in-out;
}

@keyframes bounceAnimation {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1.2);
  }
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
  z-index: 5;
}

.index-body > * {
  padding: 25px;
}
.index-body > div {
  background-image: linear-gradient(
    135deg,
    rgba(134, 134, 134, 0.5),
    rgba(31, 31, 31, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  width: 47vw;
  border-radius: 20px;
}

.index-body ul {
  display: flex;
  flex-direction: column;
}

.techs li {
  background-image: linear-gradient(
    135deg,
    rgba(134, 134, 134, 0.5),
    rgba(31, 31, 31, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  border-radius: 25px;
  padding: 25px 15px;
  margin: 20px;
  width: fit-content;
  transition: .5s;
  position: relative;
  font-size: 20px;
}

.techs li:nth-child(2n) {
  align-self: flex-end;
}

.techs li::after, .techs li::before {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  border-top: 10px solid rgba(134, 134, 134, 0.5);
  border-bottom: 10px solid rgba(134, 134, 134, 0.5);
}

.techs li::before {
  left: 0;
  border-right: 10px solid transparent;
}

.techs li::after {
  right: 0;
  border-left: 10px solid transparent;
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
