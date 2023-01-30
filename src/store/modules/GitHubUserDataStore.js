import GetProjectsOnGitHub from "../../service/GetProjectsOnGitHub";

const GitHubUserDataStore = {
  state: {
    gitHubUserData: {
      result: [],
      status_code: 0,
    },
  },
  getters: {
    gitHubUserData(state) {
      return state.gitHubUserData;
    },
  },
  mutations: {
    updateGitHubUserData(state, newGitHubUserData) {
      state.gitHubUserData = newGitHubUserData;
    },
  },
  actions: {
    getGitHubAPIData({ commit }) {
      let apiData = {};
      GetProjectsOnGitHub.getProjects()
        .then((result) => {
          let res = [];
          if (result.status === 200) {
            res = [];
            result.data.forEach((project) => {
              if (!project.fork) {
                GetProjectsOnGitHub.getProjectLanguages(project.name)
                  .then((projectLanguages) => {
                    res.push({
                      name: project.name,
                      link: project.html_url,
                      clone: project.clone_url,
                      zip_url: project.url + "/zipball/master",
                      languages: projectLanguages.data,
                    });
                  })
                  .catch(() => {
                    res.push({
                      name: project.name,
                      link: project.html_url,
                      clone: project.clone_url,
                      zip_url: project.url + "/zipball/master",
                      languages: {},
                    });
                  });
              }
            });
          }
          apiData = {
            result: res,
            status_code: result.status,
          };
          commit("updateGitHubUserData", apiData);
          return res;
        })
        .catch((err) => {
          if (err.response.status !== undefined) {
            apiData = {
              result: [],
              status_code: err.response.status,
            };
          } else {
            apiData = {
              result: [],
              status_code: 500,
            };
          }
          commit("updateGitHubUserData", apiData);
        });
    },
  },
};

export default GitHubUserDataStore;
