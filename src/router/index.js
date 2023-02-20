import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import ProjectsDetailPage from "../pages/ProjectsDetailPage.vue";
import AboutMePage from "../pages/AboutMePage.vue";
import DemoPage from "../pages/DemoPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsDetailPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutMePage,
  },
  {
    path: "/demos",
    name: "demos",
    component: DemoPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
