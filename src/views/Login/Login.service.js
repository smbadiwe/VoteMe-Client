import axios from "axios";
import BaseService from "../BaseService";

export default class LoginService extends BaseService {
  async authenticateUser(username, password, rememberme) {
    if (!username) return this.apiError("username should not be empty");
    if (!password) return this.apiError("password should not be empty");

    const axiosConfig = {};
    // const axiosConfig = {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods":
    //       "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    //   }
    // };
    try {
      const postData = {
        username: username,
        password: password,
        rememberme: rememberme
      };
      const response = await axios.post(
        process.env.REACT_APP_API_URL,
        postData,
        axiosConfig
      );
      if (this.isSuccessStatus(response.status)) {
        return this.apiSuccess(response.data);
      }
      return this.apiError(
        `Falure authenticating. ${
          response.data.message
        }. Please try again later.`
      );
    } catch (e) {
      console.log(e);
      return this.apiError("Falure authenticating. Please try again later.");
    }
  }
}
