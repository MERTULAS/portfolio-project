<template>
  <div>
    <AnimationBackground
      :pointCount="120"
      :size="{
        width: pageWidth,
        height: pageHeight - (navbarHeight + footerHeight + 6),
      }"
    />
    <div class="index-body">
      <h1>Welcome to my website</h1>
      <p>
        Hello, I am a Software Developer working on various topics. I work on
        Frontend Web technologies, game algorithms, deep learning and computer
        graphics.
      </p>
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
      navbarHeight: null,
      footerHeight: null,
      pageHeight: window.innerHeight,
      pageWidth: window.innerWidth,
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
    this.navbarHeight = document
      .querySelector(".navbar-menu")
      .getBoundingClientRect().height;
    this.footerHeight = document
      .querySelector(".footer")
      .getBoundingClientRect().height;

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
