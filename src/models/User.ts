import { AxiosResponse } from "axios";
import { Atribute } from "./Atrribute";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
export interface UserProp {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProp> = new Sync<UserProp>(rootUrl);
  public attributes: Atribute<UserProp>;
  constructor(attrs: UserProp) {
    this.attributes = new Atribute<UserProp>(attrs);
  }
  get get() {
    return this.attributes.get;
  }
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  set(update: UserProp): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
