<template>
  <div class="tabs-wrapper">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.tabName"
        :class="selectedTab === index ? 'active-tab' : ''"
        @click="selectTab(index)"
      >
        <a-icon :type="tab.icon" />
        <p>{{ tab.tabName }}</p>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import customCursorAnimation from "../utils/utils.js";

export default {
  name: "Tabs",
  props: {
    defaultTab: { type: Number, default: () => 0 },
  },
  data() {
    return {
      tabs: null,
      selectedTab: null,
    };
  },
  created() {
    this.tabs = this.$children;
    this.selectedTab = this.defaultTab;
  },
  updated() {
    [...this.$el.getElementsByTagName("li")].forEach((li) =>
      customCursorAnimation(li)
    );
  },
  mounted() {
    this.tabs = this.$children.map((tab) => {
      return {
        tabName: tab.tabName,
        isActive: tab.isActive,
        icon: tab.icon,
      };
    });
    this.selectedTab = this.defaultTab;
    let activeIndex = this.tabs.findIndex((tab) => tab.isActive === true);
    if (activeIndex === -1) {
      this.selectTab(this.defaultTab);
    } else {
      this.selectedTab = activeIndex;
    }
  },
  methods: {
    selectTab(tabIndex) {
      this.selectedTab = tabIndex;
      this.$children.forEach((tab, index) => {
        tab.isActive = index === tabIndex;
      });
    },
  },
};
</script>

<style scoped>
.tabs-wrapper {
  padding: 10px 50px;
}
.tabs {
  display: flex;
}

.tabs li {
  padding: 10px;
  margin: 0 5px;
  font-size: 17px;
  cursor: pointer;
  position: relative;
  line-height: 1;
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
}

.tabs li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  background-color: teal;
  width: 0px;
  height: 3px;
  transition: 0.5s;
}

.tabs li:hover::after {
  width: 100%;
}

.tabs li p {
  margin: 0 5px;
}

.active-tab {
  border-bottom: 3px solid teal !important;
}

.tab-content {
  padding: 10px 50px;
}
</style>
