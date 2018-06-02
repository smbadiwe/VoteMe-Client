import { callApi } from "../common/utils";

export default class LoginService {
  async authenticateUser(username, password, rememberme) {
    const postData = {
      username: username,
      password: password,
      rememberme: rememberme
    };
    const endpoint = "/auth/login";
    return await callApi(postData, endpoint);
  }
}
