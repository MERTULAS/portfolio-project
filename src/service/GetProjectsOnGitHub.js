import axios from "axios";

const GITHUB_API =
  "https://api.github.com/users/" + process.env.VUE_APP_GIT_USERNAME;

class GetDataOnGitHub {
  getProfileData() {
    return axios.get(GITHUB_API);
  }

  getProjects() {
    return axios.get(GITHUB_API + "/repos");
  }
}

export default new GetDataOnGitHub();
