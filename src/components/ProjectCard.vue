<template>
  <div class="project-card-body">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    title: { type: String, default: () => "" },
    link: { type: String, default: () => "" },
    image: { type: Object, default: () => {} }, // This type maybe string with src link string...
  },
  data() {
    return {};
  },
};
</script>

<style>
.project-card-body {
  background-color: rgb(90, 1, 1);
  margin: 15px;
  width: 25vw;
  height: 25vh;
}

.project-card-body h3 {
  width: fit-content;
}
</style>
