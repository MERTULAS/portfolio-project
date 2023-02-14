<template>
  <div class="project-card-body">
    <div class="header-block">
      <a
        :href="project.link"
        target="_blank"
        style="text-transform: capitalize"
        >{{
          ["-", "_"]
            .reduce(
              (parsedString, char) => parsedString.join(" ").split(char),
              [project.name]
            )
            .join(" ")
        }}</a
      >
      <div class="project-download-icons">
        <a-icon
          type="cloud-download"
          @click="downloadAsZipFile(project.zip_url, project.name)"
        />
        <a-icon type="desktop" @click="copyToClipboard(project.clone)" />
      </div>
      <div v-if="isCopyInfoCardVisible" class="copy-info">
        Paste on Terminal
      </div>
    </div>
    <div class="body-block">
      <div class="body-charts">
        <Chart
          v-if="false"
          :dataSource="project.languages"
          :barColors="languageColors"
          miniChart
        />
        <PieChart
          :dataSource="project.languages"
          :barColors="languageColors"
          style="width: 160%; height: 160px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart.vue";
import PieChart from "./PieChart.vue";

export default {
  name: "ProjectCard",
  props: {
    project: { type: Object, default: () => {} },
  },
  components: {
    Chart,
    PieChart,
  },
  data() {
    return {
      isCopyInfoCardVisible: false,
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
  methods: {
    downloadAsZipFile(url, filename) {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      link.remove();
    },
    copyToClipboard(text) {
      text = "git clone " + text;
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      } else {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        new Promise((res, rej) => {
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
      this.isCopyInfoCardVisible = true;
      setTimeout(() => {
        this.isCopyInfoCardVisible = false;
      }, 3000);
    },
  },
};
</script>

<style>
.project-card-body {
  background-image: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.5),
    rgba(33, 33, 33, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  margin: 15px;
  padding: 10px;
  border-radius: 5px;
  flex-basis: 20%;
  max-width: 47%;
  min-width: 288px;
  height: 33vh;
  border: 1px solid black;
}

.project-card-body a {
  font-size: 18px;
}

.project-card-body a:hover {
  transition: 0.5s !important;
  color: teal !important;
}

.project-card-body h3 {
  overflow-wrap: break-word;
  margin-bottom: 10px;
}

.header-block {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 5px;
  border-bottom: 2px solid green;
  margin-bottom: 10px;
}

.header-block .anticon {
  font-size: 25px;
}

.header-block .anticon:hover * {
  transition: 0.5s !important;
  color: teal !important;
}

.project-download-icons {
  display: flex;
  align-items: center;
}

.project-download-icons * {
  margin: 0 4px;
}

.copy-info {
  position: absolute;
  right: 0;
  transform: translateX(40%);
  background-color: rgb(167, 167, 167);
  padding: 8px;
  border-radius: 5px;
  animation: openCopyInfo 2.5s;
  box-shadow: 0px 0px 5px 5px black;
}

.copy-info::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  border-left: 10px solid rgb(167, 167, 167);
  border-top: 10px solid rgb(167, 167, 167);
}

@keyframes openCopyInfo {
  0% {
    top: 150%;
    opacity: 1;
  }

  100% {
    top: 80%;
    opacity: 0.5;
  }
}

.body-block {
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.body-charts {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
