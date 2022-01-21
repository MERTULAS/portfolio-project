<template>
  <div id="app">
    <Navbar />
    <!--The spinner maybe replace to this place, more effective according to which situation, who knows???? -->
    <router-view style="min-height: 78vh" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style></style>
