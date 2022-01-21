<template>
  <div class="project-card-body">
    <div class="header-block">
      <a :href="project.link" target="_blank">{{ project.name }}</a>
      <a-icon type="cloud-download" @click="copyToClipboard(project.clone)" />
      <div v-if="isCopyInfoCardVisible" class="copy-info">
        Paste on Terminal
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: { type: Object, default: () => {} },
  },
  data() {
    return {
      isCopyInfoCardVisible: false,
    };
  },
  methods: {
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
      }, 2000);
    },
  },
};
</script>

<style>
.project-card-body {
  background-image: linear-gradient(
    45deg,
    rgba(33, 33, 33, 0.5),
    rgba(33, 0, 0, 0.8)
  );
  margin: 15px;
  padding: 10px;
  width: 25vw;
  height: 25vh;
  border-radius: 5px;
}

.project-card-body h3 {
  overflow-wrap: break-word;
  margin-bottom: 10px;
}

.header-block {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.header-block .anticon {
  font-size: 20px;
}

.header-block .anticon:hover * {
  color: teal !important;
}

.copy-info {
  position: absolute;
  right: 0;
  transform: translateX(40%);
  background-color: #333;
  padding: 8px;
  border-radius: 5px;
  animation: openCopyInfo 2.5s;
}

.copy-info::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  border-left: 10px solid #333;
  border-top: 10px solid #333;
}

@keyframes openCopyInfo {
  0% {
    top: 0%;
    opacity: 0.5;
  }

  50% {
    top: 80%;
    opacity: 1;
  }

  100% {
    top: 0%;
    opacity: 0.5;
  }
}
</style>
