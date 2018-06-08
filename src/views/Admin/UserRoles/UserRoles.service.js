import { callApi } from "../../common/utils";

export default class UserRolesService {
  async search(pageIndex = 0, pageSize = 10) {
    const getData = { pageIndex: pageIndex, pageSize: pageSize };
    const endpoint = "/admin/userroles";
    return await callApi(getData, endpoint, false);
  }

  async getById(id) {
    const endpoint = "/admin/userroles/" + id;
    return await callApi(null, endpoint, false);
  }

  async add(name) {
    const postData = { name: name };
    const endpoint = "/admin/userroles/add";
    return await callApi(postData, endpoint);
  }
}
