<template>
  <div class="footer">
    <div class="footer-upper-body">
      <div class="social-media">
        <div
          v-for="(socialMediaObject, index) in socialMediaLinks"
          :key="index"
        >
          <a :href="socialMediaObject.link" target="_blank">
            <a-icon :type="socialMediaObject.icon" />
          </a>
        </div>
      </div>
    </div>
    <p class="footer-date">
      All rights reserved. &copy; 2020 - {{ footerDate }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footerDate: new Date().getFullYear(),
      socialMediaLinks: [
        {
          icon: "linkedin",
          link: "https://www.linkedin.com/in/mert-ulas/",
        },
        {
          icon: "github",
          link: "https://github.com/MERTULAS",
        },
        {
          icon: "twitter",
          link: "https://twitter.com/mertulaas",
        },
        {
          icon: "instagram",
          link: "https://www.instagram.com/mertulas1/?hl=tr",
        },
        {
          icon: "youtube",
          link: "https://www.youtube.com/channel/UCIXpGQz894CXt0x1dSKVdxA",
        },
      ],
    };
  },
};
</script>

<style scoped>
.anticon {
  cursor: pointer !important;
}

.footer {
  background-color: var(--footer-bg-color);
  width: 100%;
  padding: 25px;
  text-align: center;
}

.footer * {
  color: var(--footer-font-color);
}

.social-media {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}

.social-media div {
  padding: 5px;
  font-size: 28px;
}

.social-media div:hover * {
  transition: 0.5s;
  color: teal !important;
}
</style>
