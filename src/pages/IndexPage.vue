<template>
  <div>
    <Navbar />
    <AnimationBackground :pointCount="80" />
    <div class="index-body"></div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnimationBackground from "@/components/AnimationBackground.vue";

export default {
  components: {
    AnimationBackground,
    Navbar,
    Footer,
  },
  name: "IndexPage",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
