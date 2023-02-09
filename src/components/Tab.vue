<template>
  <div class="tab">
    <div v-if="lazyLoading">
      <div v-if="isActive">
        <slot />
      </div>
    </div>
    <div v-else>
      <div v-show="isActive">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabName: { type: String, required: true },
    icon: { type: String, default: () => "" },
    active: { type: Boolean, default: () => false },
    lazyLoading: { type: Boolean, default: () => false },
  },
  data() {
    return {
      isActive: null,
    };
  },
  mounted() {
    this.isActive = this.active;
  },
};
</script>

<style scoped></style>
