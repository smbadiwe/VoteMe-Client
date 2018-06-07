import { callApi } from "../../common/utils";

export default class PrivilegeService {
  async search(pageIndex = 0, pageSize = 10) {
    const getData = { pageIndex: pageIndex, pageSize: pageSize };
    const endpoint = "/admin/privileges";
    return await callApi(getData, endpoint, false);
  }

  async getData(pageIndex = 0, pageSize = 10) {
    const data = [
      { id: 21, name: "Soma" },
      { id: 22, name: "Soma2" },
      { id: 23, name: "Soma3" },
      { id: 24, name: "Soma4" },
      { id: 25, name: "Soma5" },
      { id: 22, name: "Soma2" },
      { id: 23, name: "Soma3" },
      { id: 24, name: "Soma4" },
      { id: 25, name: "Soma5" },
      { id: 29, name: "Soma5" }
    ];
    const dbData = [];
    for (const item of data) {
      for (let i = 0; i < 5; i++) {
        const idVal = item.id * (i + 1);
        dbData.push({ id: idVal, name: item.name + " - " + idVal });
      }
    }

    const start = pageIndex * pageSize;
    const end = start + +pageSize;
    return { data: dbData.slice(start, end), totalCount: dbData.length };
  }

  async getById(id) {
    const getData = {};
    const endpoint = "/admin/privileges/" + id;
    return await callApi(getData, endpoint, false);
  }

  async add(name) {
    const postData = { name: name };
    const endpoint = "/admin/privileges/add";
    return await callApi(postData, endpoint);
  }
}
