<template>
  <div class="page">
    <Spinner :spinning="isSpinning" />
    <Tabs v-if="!isSpinning">
      <Tab :tabName="'Project List'" icon="unordered-list" lazyLoading>
        <div class="project-list">
          <project-card
            v-for="(project, index) in projectListResult"
            :key="index"
            :project="project"
          />
        </div>
      </Tab>
      <Tab :tabName="'Analysis'" icon="bar-chart" lazyLoading>
        <div>PROJECTS ANALYSIS</div>
        <Chart
          :dataSource="generalGitHubLangPercentages"
          :height="400"
          :barColors="languageColors"
        />
        <PieChart
          style="margin-top: 10vh; height: 400px"
          :dataSource="generalGitHubLangPercentages"
          :barColors="languageColors"
        />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard.vue";
import Spinner from "../components/Spinner.vue";
import Tab from "../components/Tab.vue";
import Tabs from "../components/Tabs.vue";
import Chart from "../components/Chart.vue";
import PieChart from "../components/PieChart.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectDetailPage",
  components: {
    ProjectCard,
    Tabs,
    Tab,
    Spinner,
    Chart,
    PieChart,
  },
  data() {
    return {
      status_code: 0,
      projectListResult: [],
      isSpinning: false,
      generalGitHubLangPercentages: {},
      languageColors: {
        Python: "#3572a5",
        JavaScript: "#f1e05a",
        C: "#555555",
        "C++": "#f34b7d",
        CSS: "#563d7c",
        Vue: "#41b883",
        "Jupyter Notebook": "#da5b0b",
        HTML: "#e34c26",
        Shell: "#89e051",
      },
    };
  },
  computed: {
    ...mapState({
      projectList: (state) => state.GitHubUserDataModule.gitHubUserData,
    }),
  },
  watch: {
    projectList: {
      handler(newVal) {
        this.initProjectList(newVal.result);
      },
      deep: true,
    },
  },
  methods: {
    generalGitHubAnalysisPreperation() {
      this.projectListResult.forEach((project) => {
        Object.keys(project.languages).forEach((language) => {
          if (this.generalGitHubLangPercentages[language] === undefined) {
            this.generalGitHubLangPercentages[language] =
              project.languages[language];
          } else
            this.generalGitHubLangPercentages[language] +=
              project.languages[language];
        });
      });

      const generalGitHubLangPercentagesDenominator =
        this.projectListResult.length * 100;

      Object.keys(this.generalGitHubLangPercentages).forEach((lang) => {
        this.generalGitHubLangPercentages[lang] = parseFloat(
          (
            (this.generalGitHubLangPercentages[lang] /
              generalGitHubLangPercentagesDenominator) *
            100
          ).toFixed(2)
        );
      });

      this.isSpinning = false;
    },
    initProjectList(list) {
      this.projectListResult = list.map((object) => {
        let assignedObject = Object.assign({}, object);
        assignedObject.languages = this.getProjectLanguagesPercentages(
          object.languages
        );
        return assignedObject;
      });

      this.generalGitHubAnalysisPreperation();
    },
    getProjectLanguagesPercentages(languagesObject) {
      let langValuesTotal = Object.values(languagesObject).reduce(
        (total, langVal) => total + langVal
      );
      const newLangObject = {};
      Object.keys(languagesObject).forEach((lang) => {
        newLangObject[lang] = parseFloat(
          ((languagesObject[lang] / langValuesTotal) * 100).toFixed(2)
        );
      });
      return newLangObject;
    },
    loadProjects() {
      this.isSpinning = true;
      this.$store.dispatch("getGitHubAPIData");
    },
  },
  mounted() {
    if (this.projectList.status_code === 200) 
      this.initProjectList(this.projectList.result);
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
