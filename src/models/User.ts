import axios, { AxiosResponse } from "axios";
interface UserProp {
  name?: string;
  age?: number;
}
type CallBack = () => void;

export class User {
  events: { [key: string]: CallBack[] } = {};
  constructor(private data: UserProp) {}
  get(propName: string): number | string {
    return this.data[propName];
  }
  set(update: UserProp): void {
    Object.assign(this.data, update);
  }
  on(eventName: string, callback: CallBack) {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  }
  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  }
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse) => {
        this.set(response.data);
      });
  }
  save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users${id}`, this.data);
    } else {
      axios.post("http://localhost:3000/users", this.data);
    }
  }
}
