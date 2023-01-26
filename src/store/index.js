import Vue from "vue";
import Vuex from "vuex";

import GitHubUserDataStore from "./modules/GitHubUserDataStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    GitHubUserDataModule: GitHubUserDataStore
  },
});
