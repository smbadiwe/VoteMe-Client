import { callApi } from "../../common/utils";

export default class UsersService {
  async search(pageIndex = 0, pageSize = 10) {
    const getData = { pageIndex: pageIndex, pageSize: pageSize };
    const endpoint = "/admin/users";
    return await callApi(getData, endpoint, false);
  }

  async getById(id) {
    const endpoint = "/admin/users/" + id;
    return await callApi(null, endpoint, false);
  }

  async add(name) {
    const postData = { name: name };
    const endpoint = "/admin/users/add";
    return await callApi(postData, endpoint);
  }
}
