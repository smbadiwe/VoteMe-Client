import { callApi } from "../common/utils";

export default class ChangePasswordService {
  async changePassword(email, newPassword) {
    const postData = { email: email, newPassword: newPassword };
    const endpoint = "/auth/changepassword";
    return await callApi(postData, endpoint);
  }
}
