import axios from "axios";

const GITHUB_USERS_API =
  "https://api.github.com/users/" + process.env.VUE_APP_GIT_USERNAME;
const GITHUB_REPOS_API =
  "https://api.github.com/repos/" + process.env.VUE_APP_GIT_USERNAME;

class GetDataOnGitHub {
  getProfileData() {
    return axios.get(GITHUB_USERS_API);
  }

  getProjects() {
    return axios.get(GITHUB_USERS_API + "/repos");
  }

  getProjectLanguages(repo_name) {
    return axios.get(`${GITHUB_REPOS_API}/${repo_name}/languages`);
  }
}

export default new GetDataOnGitHub();
