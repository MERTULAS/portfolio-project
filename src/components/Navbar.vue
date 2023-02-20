<template>
  <div class="navbar-menu">
    <div class="project-owner">
      <h1 @click="routeTo('/')" :data-logo="projectOwner">
        {{ projectOwner }}
      </h1>
    </div>
    <ul :class="clickedHamburger ? 'navbar-responsive' : ''">
      <li
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :class="$route.path === menuItem.path ? 'active-menu' : ''"
        @click="routeTo(menuItem.path)"
      >
        <a-icon :type="menuItem.icon" class="menu-icon" />
        <p style="margin: 0">
          {{ menuItem.title }}
        </p>
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
</template>

<script>
import customCursorAnimation from "../utils/utils.js";

export default {
  name: "Navbar",
  data() {
    return {
      menuItems: [
        { title: "Home", path: "/", icon: "home" },
        { title: "My Projects", path: "/projects", icon: "code" },
        // { title: "Demos", path: "/demos", icon: "rocket" },
        { title: "About Me", path: "/about", icon: "user" },
      ],
      selectedMenuIndex: 0,
      clickedHamburger: false,
      projectOwner: process.env.VUE_APP_PROJECT_OWNER,
    };
  },
  watch: {
    $route: {
      handler: function () {
        this.clickedHamburger = false;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    routeTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
      return;
    },
  },
  mounted() {
    window.addEventListener("resize", (event) => {
      this.clickedHamburger =
        event.currentTarget.innerWidth > 765 && this.clickedHamburger;
    });

    [...this.$el.getElementsByTagName("li")].forEach((li) => {
      customCursorAnimation(li);
    });

    customCursorAnimation(document.querySelector(".project-owner"));
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
  color: white !important;
}

.project-owner {
  border-right: 5px solid teal;
  border-left: 5px solid teal;
  border-radius: 10px;
  z-index: 9999 !important;
  cursor: pointer;
  overflow: hidden;
  height: fit-content;
  padding: 0px 15px;
}

.project-owner:hover > h1 {
  animation: text-marquee 2s linear infinite;
}

@keyframes text-marquee {
  0% {
    left: 0%;
  }

  100% {
    left: -105%;
  }
}

.project-owner h1::after {
  content: attr(data-logo);
  position: absolute;
  transform: translateX(20px);
  width: 100%;
}
.project-owner h1 {
  font-weight: 500;
  color: var(--navbar-font-color);
  margin: 0px 5px;
  font-size: 28px;
  position: relative;
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
  cursor: pointer;
  position: relative;
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
}

.navbar-menu li:hover ~ #custom-cursor {
  transform: scale(2) !important;
}

.menu-icon {
  margin-right: 5px;
  font-size: 25px;
}

.navbar-menu li a {
  color: var(--navbar-font-color);
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
    top: 60px;
    left: 0;
    height: calc(100vh - 60px);
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
