<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <div v-if="!isSpinning" class="project-list">
      <project-card
        v-for="(project, index) in projectListResult"
        :key="index"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
import Spinner from "../components/Spinner.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectDetailPage",
  components: {
    ProjectCard,
    Spinner,
  },
  data() {
    return {
      status_code: 0,
      projectListResult: [],
      isSpinning: false,
    };
  },
  computed: {
    ...mapState({
      projectList: (state) => state.GitHubUserDataModule.gitHubUserData,
    }),
  },
  watch: {
    projectList(val) {
      if (val) {
        this.projectListResult = val.result;
        this.isSpinning = false;
      }
    },
  },
  methods: {
    loadProjects() {
      this.isSpinning = true;
      this.$store.dispatch("getGitHubAPIData");
    },
  },
  mounted() {
    if (this.projectList.status_code === 200)
      this.projectListResult = this.projectList.result;
    else this.loadProjects();
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
