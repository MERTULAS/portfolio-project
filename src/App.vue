<template>
  <div id="app">
    <Navbar />
    <!--The spinner maybe replace to this place, more effective according to which situation, who knows???? -->
    <AnimationBackground
      v-if="isLoadPage"
      class="animated-bg-block"
      :pointCount="120"
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
        <div class="init-progress-bar" v-if="isProgress">
          <div class="progress">{{ progress }} %</div>
        </div>
        <router-view v-else />
      </div>
    </AnimationBackground>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnimationBackground from "@/components/AnimationBackground.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    AnimationBackground,
  },
  data() {
    return {
      navbarHeight: null,
      footerHeight: null,
      pageHeight: null,
      pageWidth: null,
      isLoadPage: false,
      isProgress: true,
      progress: 0,
    };
  },
  methods: {
    pageInitialize() {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
      console.log(this.pageHeight, this.pageWidth);
      this.navbarHeight = document
        .querySelector(".navbar-menu")
        .getBoundingClientRect().height;
      this.footerHeight = document
        .querySelector(".footer")
        .getBoundingClientRect().height;
      console.log(this.navbarHeight, this.footerHeight);
      this.isLoadPage = true;
    },
  },
  mounted() {
    this.pageInitialize();
    document.getElementsByTagName("title")[0].innerHTML =
      process.env.VUE_APP_PROJECT_OWNER + " - Portfolio";
    setTimeout(() => {
      this.isProgress = false;
    }, 4000);
  },
};
</script>

<style>
.init-progress-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 500px;
  background: transparent;
  border: 3px solid green;
  color: white;
  border-radius: 10px;
}

.progress {
  border-radius: 5px;
  background: green;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 30px;
  animation: progressInit 4s forwards;
}

@keyframes progressInit {
  0% {
    width: 50px;
  }
  100% {
    width: 100%;
  }
}
</style>
