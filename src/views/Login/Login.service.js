import axios from "axios";
import BaseService from "../BaseService";

export default class LoginService extends BaseService {
  async authenticateUser(username, password, rememberme) {
    if (!username) return this.apiError("username should not be empty");
    if (!password) return this.apiError("password should not be empty");

    try {
      const postData = {
        username: username,
        password: password,
        rememberme: rememberme
      };
      const response = await axios.post(this.getApiFullUrl("/auth/login"), postData);
      if (this.isSuccessStatus(response.status)) {
        return this.apiSuccess(response.data);
      }
      return this.apiError(`Falure authenticating. ${response.message}. Please try again later.`);
    } catch (e) {
      console.log(e);
      return this.apiError("Falure authenticating. Please try again later.");
    }
  }
}
