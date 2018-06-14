import { callApi } from "../common/utils";

export default class RegisterService {
  async registerUser(userRegInfo) {
    const postData = {
      firstname: userRegInfo.firstname,
      middlename: userRegInfo.middlename,
      lastname: userRegInfo.lastname,
      password: userRegInfo.password,
      email: userRegInfo.email,
      url: `${process.env.REACT_APP_BASE_URL}/#/verifyuser`
    };
    const endpoint = "/register";
    return await callApi(postData, endpoint);
  }

  async verifyUser(token) {
    const endpoint = "/verifyuser";
    return await callApi({ token: token }, endpoint, false);
  }
}
