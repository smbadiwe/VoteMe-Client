import { callApi } from "../common/utils";

export default class RegisterService {
  async registerUser(email, username, password) {
    const postData = { username: username, password: password, email: email };
    const endpoint = "/auth/register";
    return await callApi(postData, endpoint);
  }
}
