<template>
  <div>
    <Navbar />
    <GraphicsAnimation :pointCount="100" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import GraphicsAnimation from "@/components/GraphicsAnimation.vue";

export default {
  components: {
    GraphicsAnimation,
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
