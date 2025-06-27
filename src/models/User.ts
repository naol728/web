import { Apisync } from "./Apisync";
import { Atribute } from "./Atrribute";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";

export interface UserProp {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProp> {
  static buildUser(attrs: UserProp): User {
    return new User(
      new Atribute<UserProp>(attrs),
      new Apisync<UserProp>(rootUrl),
      new Eventing()
    );
  }
  static buildUserCollection() {
    return new Collection<User, UserProp>(rootUrl, User.buildUser);
  }
}
