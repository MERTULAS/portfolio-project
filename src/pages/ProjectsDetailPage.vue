<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <Tabs v-if="!isSpinning">
      <Tab :tabName="'Project List'" icon="home" lazyLoading active>
        <div class="project-list">
          <project-card
            v-for="(project, index) in projectListResult"
            :key="index"
            :project="project"
          />
        </div>
      </Tab>
      <Tab :tabName="'Analysis'" icon="rocket" lazyLoading>
        <div class="project-list">PROJECTS ANALYSIS</div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
import Spinner from "../components/Spinner.vue";
import Tab from "../components/Tab.vue";
import Tabs from "../components/Tabs.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectDetailPage",
  components: {
    ProjectCard,
    Tabs,
    Tab,
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
