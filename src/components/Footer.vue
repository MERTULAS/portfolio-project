<template>
  <div class="footer">
    <div class="footer-upper-body">
      <div class="social-media">
        <div
          v-for="(socialMediaObject, index) in socialMediaLinks"
          :key="index"
        >
          <a-icon :type="socialMediaObject.icon" />
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
  data() {
    return {
      footerDate: new Date().getFullYear(),
      socialMediaLinks: [
        {
          icon: "linkedin",
          link: "https://www.linkedin.com/in/mert-ulas/",
        },
        {
          icon: "twitter",
          link: "https://twitter.com/mertulaas",
        },
        {
          icon: "github",
          link: "https://github.com/MERTULAS",
        },
        {
          icon: "instagram",
          link: "https://www.instagram.com/mertulas1/?hl=tr",
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
  position: absolute;
  width: 100%;
  padding: 25px;
  bottom: 0;
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
  font-size: 25px;
}

.social-media div:hover .anticon {
  transition: 0.5s;
  color: teal;
}
</style>
