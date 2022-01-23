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
    135deg,
    rgba(0, 0, 0, 0.5),
    rgba(33, 33, 33, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  margin: 15px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 15px 5px rgba(33, 33, 33, 0.5);
  flex-basis: 46%;
  max-width: 46%;
  min-width: 288px;
  height: 30vh;

  border: 1px solid black;
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
  font-size: 25px;
}

.header-block .anticon:hover * {
  transition: 0.5s !important;
  color: teal !important;
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
</style>
