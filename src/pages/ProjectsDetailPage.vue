<template>
  <div class="page">
    <center><h1>ProjectDetailPage</h1></center>
    <div class="project-list">
      <project-card
        v-for="project in projectList"
        :key="project.title"
        :title="project.title"
        :link="project.link"
        :image="{}"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
export default {
  name: "ProjectDetailPage",
  components: {
    ProjectCard,
  },
  data() {
    return {
      projectList: Array(16)
        .fill({
          title: "Project 1",
          link: "link1",
          image: new Image(""),
        })
        .map((project, index) => {
          return { ...project, title: "Project " + (index + 1) };
        }),
    };
  },
};
</script>

<style>
.project-list {
  background-color: red;
  padding: 25px 20vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
