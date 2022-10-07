<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <div v-if="!isSpinning" class="project-list">
      <project-card
        v-for="(project, index) in projectList"
        :key="index"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
import Spinner from "../components/Spinner.vue";
import GetProjectsOnGitHub from "../service/GetProjectsOnGitHub";

export default {
  name: "ProjectDetailPage",
  components: {
    ProjectCard,
    Spinner,
  },
  data() {
    return {
      status_code: 0,
      projectList: [],
      isSpinning: true,
    };
  },
  watch: {
    projectList(val) {
      if (val) {
        this.isSpinning = false;
      }
    },
  },
  methods: {
    loadProjects() {
      GetProjectsOnGitHub.getProjects().then((result) => {
        this.status_code = result.status;
        if (this.status_code === 200) {
          this.projectList = [];
          result.data.forEach((project) => {
            if (!project.fork) {
              this.projectList.push({
                name: project.name,
                link: project.html_url,
                clone: project.clone_url,
              });
            }
          });
        }
      });
    },
  },
  mounted() {
    this.loadProjects();
  },
};
</script>

<style>
.project-list {
  padding: 25px 5vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
