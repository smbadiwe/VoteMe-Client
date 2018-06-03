import { callApi } from "../../common/utils";

export default class PrivilegeService {
  async search(page = 0, pageSize = 10) {
    const getData = { page: page, pageSize: pageSize };
    const endpoint = "/admin/privileges";
    return await callApi(getData, endpoint, false);
  }

  async getById(id) {
    const getData = {};
    const endpoint = "/admin/privileges/" + id;
    return { status: true, data: { id: id, name: "Soma - " + id } }; // await callApi(getData, endpoint, false);
  }

  async add(name) {
    const postData = { name: name };
    const endpoint = "/admin/privileges/add";
    return await callApi(postData, endpoint);
  }
}
