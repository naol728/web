import axios, { AxiosPromise } from "axios";
interface HasAnId {
  id?: number;
}

export class Apisync<T extends HasAnId> {
  constructor(public rootUrl: string) {}
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootUrl}${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
