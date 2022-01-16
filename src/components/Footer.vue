<template>
  <div class="footer">
    <div class="social-media">
      <div v-for="(socialMediaObject, index) in socialMediaLinks" :key="index">
        <a-icon :type="socialMediaObject.icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footerDate: new Date(),
      socialMediaLinks: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/mert-ulas/'

        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/mertulaas'

        },
        {
          icon: 'github',
          link: 'https://github.com/MERTULAS'

        },
        {
          icon: 'instagram',
          link: 'https://www.instagram.com/mertulas1/?hl=tr'

        }
      ]
    }
  }
}
</script>

<style></style>
