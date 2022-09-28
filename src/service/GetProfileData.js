import axios from "axios";

const PROFILE_DATA_URL = "./data/about_me.json";

class GetProfileData {
  getData() {
    return axios.get(PROFILE_DATA_URL);
  }
}

export default new GetProfileData();
