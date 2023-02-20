<template>
  <div id="app">
    <Navbar />
    <!--The spinner maybe replace to this place, more effective according to which situation, who knows???? -->
    <AnimationBackground
      v-if="isLoadPage"
      class="animated-bg-block"
      :pointCount="pointCount"
      :size="{
        width: pageWidth,
        height: pageHeight - (navbarHeight + footerHeight),
      }"
    >
      <div
        :style="`overflow-y: auto; height: ${
          pageHeight - (navbarHeight + footerHeight)
        }px`"
      >
        <div
          class="init-progress-bar"
          :style="`width: ${progressBarWidth}vw`"
          v-if="isProgress"
        >
          <div
            class="progress"
            :style="`width: ${
              progress * (progressBarWidth / 100)
            }vw; max-width: calc(${progressBarWidth}vw - 18px)`"
          >
            <p>{{ progress }} %</p>
          </div>
        </div>
        <router-view v-else />
        <!-- <SelectorArcher /> -->
      </div>
    </AnimationBackground>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnimationBackground from "@/components/AnimationBackground.vue";
// import SelectorArcher from "@/components/SelectorArcher.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    AnimationBackground,
    // SelectorArcher,
  },
  data() {
    return {
      navbarHeight: null,
      footerHeight: null,
      pageHeight: null,
      pageWidth: null,
      isLoadPage: false,
      isProgress: true,
      progress: 20,
      progressBarWidth: 60,
      pointCount: 120,
      progressInterval: null,
    };
  },
  watch: {
    progress(val) {
      if (val >= 100) {
        clearInterval(this.progressInterval);
        this.isProgress = false;
      }
    },
  },
  methods: {
    setCustomCursor() {
      const customCursor = document.createElement("div");
      customCursor.setAttribute("id", "custom-cursor");
      customCursor.className = "custom-cursor";
      document.body.appendChild(customCursor);
      let cursorRect = customCursor.getBoundingClientRect();
      window.addEventListener(`mousemove`, (e) => {
        customCursor.style.left = `${e.clientX - (cursorRect.width >> 1)}px`;
        customCursor.style.top = `${e.clientY - (cursorRect.height >> 1)}px`;
      });
    },
    pageInitialize() {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
      this.navbarHeight = document
        .querySelector(".navbar-menu")
        .getBoundingClientRect().height;
      this.footerHeight = document
        .querySelector(".footer")
        .getBoundingClientRect().height;
      this.isLoadPage = true;
    },
    progressBar() {
      this.progress += Math.floor(Math.random() * 10);
    },
    detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];
      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    },
  },
  created() {
    this.setCustomCursor();
  },
  mounted() {
    this.pageInitialize();
    document.getElementsByTagName("title")[0].innerHTML =
      process.env.VUE_APP_PROJECT_OWNER + " - Portfolio";
    this.progressInterval = setInterval(this.progressBar, 150);
    // this.pointCount = this.detectMob() ? 30 : 120;
  },
};
</script>

<style>
.init-progress-bar {
  position: absolute;
  padding: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  background: transparent;
  border: 3px solid green;
  color: white;
  border-radius: 10px;
}

.progress {
  border-radius: 5px;
  background: green;
  height: 100%;
}

.progress p {
  font-size: 30px;
  font-style: italic;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(-6%, -50%);
}
</style>
