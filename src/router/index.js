import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import ProjectsDetailPage from "../pages/ProjectsDetailPage.vue";
import AboutMePage from "../pages/AboutMePage.vue";
import FunPage from "../pages/FunPage.vue";

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
    path: "/fun",
    name: "fun",
    component: FunPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
