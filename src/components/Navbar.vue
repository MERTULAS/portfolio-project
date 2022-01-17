<template>
  <div>
    <div class="navbar-menu">
      <div class="project-owner">
        <h1>{{ projectOwner }}</h1>
      </div>
      <ul :class="clickedHamburger ? 'navbar-responsive' : ''">
        <li
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :class="index === selectedMenuIndex ? 'active-menu' : ''"
        >
          {{ menuItem }}
        </li>
      </ul>
      <div
        class="hamburger-menu"
        @click="() => (clickedHamburger = !clickedHamburger)"
      >
        <div
          v-for="i in Array(3)"
          :key="i"
          :class="clickedHamburger ? 'hamburger-clicked' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: ["Home", "My Project Details", "About Me"],
      selectedMenuIndex: 0,
      clickedHamburger: false,
      projectOwner: process.env.VUE_APP_PROJECT_OWNER,
    };
  },
  mounted() {
    window.addEventListener("resize", (event) => {
      this.clickedHamburger =
        event.currentTarget.innerWidth > 765 && this.clickedHamburger;
    });
  },
};
</script>

<style scoped>
.navbar-menu {
  width: 100%;
  padding: 5px;
  background: var(--navbar-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9990;
}

.project-owner {
  z-index: 9999 !important;
}

.project-owner h1 {
  font-weight: 500;
  color: var(--navbar-font-color);
  padding: 0px 15px;
  margin: 0px 5px;
  border-right: 5px solid teal;
  border-left: 5px solid teal;
  border-radius: 10px;
  /* border-bottom-right-radius: 0px; */
  font-size: 25px;
}

.navbar-menu ul {
  width: fit-content;
  display: flex;
  margin: 0;
  padding-top: 5px;
}

.navbar-menu li {
  margin: 0 5px;
  line-height: 1;
  padding: 15px 25px;
  font-size: 16px;
  color: var(--navbar-font-color);
  cursor: pointer;
  position: relative;
  border-bottom: 3px solid transparent;
}

.navbar-menu li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: teal;
  width: 0px;
  height: 3px;
  transition: 0.5s;
}

.navbar-menu li:hover::after {
  width: 100%;
}

.active-menu {
  border-bottom: 3px solid teal !important;
}

.hamburger-menu {
  border: 1px solid gray;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  cursor: pointer;
}

.hamburger-menu div {
  width: 30px;
  height: 5px;
  background-color: gray;
  margin: 2px 0;
  border-radius: 2px;
  transition: 0.5s;
}

.hamburger-clicked {
  transform-origin: center;
}

.hamburger-clicked:nth-child(1) {
  transform: translateY(180%) rotate(45deg);
}

.hamburger-clicked:nth-child(2) {
  transform: translateX(200%);
}

.hamburger-clicked:nth-child(3) {
  transform: translateY(-180%) rotate(-45deg);
}

@media screen and (max-width: 765px) {
  .navbar-menu ul {
    display: none;
  }

  .hamburger-menu {
    display: flex;
  }

  .navbar-responsive {
    background: var(--navbar-bg-color);
    display: flex !important;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 61px;
    left: 0;
    height: calc(100vh - 61px);
    width: 100vw !important;
    animation: responsiveMenuOpen 0.5s;
    z-index: 99;
  }

  @keyframes responsiveMenuOpen {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }

  .navbar-responsive li {
    height: fit-content;
  }
}
</style>
