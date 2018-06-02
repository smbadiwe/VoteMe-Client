import { callApi } from "../common/utils";

export default class ResetPasswordService {
  async resetPassword(token) {
    const postData = { token: token };
    const endpoint = "/auth/resetpassword";
    return await callApi(postData, endpoint);
  }

  async sendResetPasswordMailTo(email, endpointUrl) {
    if (!email) return apiError("email should not be empty");
    if (!endpointUrl) return apiError("endpointUrl should not be empty");

    const postData = { email: email, endpointUrl: endpointUrl };
    const endpoint = "/auth/sendresetpasswordemail";
    return await callApi(postData, endpoint);
  }
}
