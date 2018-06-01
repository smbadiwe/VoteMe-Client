import axios from "axios";
import BaseService from "../BaseService";

export default class ResetPasswordService extends BaseService {
  async resetPassword(token) {
    try {
      const postData = { token: token };
      const response = await axios.post(this.getApiFullUrl("/auth/resetpassword"), postData);
      if (this.isSuccessStatus(response.status)) {
        return this.apiSuccess(response.data);
      }
      return this.apiError(`Falure authenticating. ${response.message}. Please try again later.`);
    } catch (e) {
      console.log(e);
      return this.apiError("Falure authenticating. Please try again later.");
    }
  }

  async sendResetPasswordMailTo(email, endpointUrl) {
    if (!email) return this.apiError("email should not be empty");
    if (!endpointUrl) return this.apiError("endpointUrl should not be empty");

    try {
      const postData = { email: email, endpointUrl: endpointUrl };
      const response = await axios.post(
        this.getApiFullUrl("/auth/sendresetpasswordemail"),
        postData
      );
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
