import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/tests/";

class TestService {
  getTest(test_uuid) {
    return axios.get(API_URL + test_uuid + "/", authHeader()).then((response) => {
      return response.data;
    });
  }
}

export default new TestService();
