import { UserForm } from "./view/UserForm";
import { User } from "./models/User";
const user = User.buildUser({ name: "naol", age: 31 });
const root = document.getElementById("root");
if (root) {
  const userform = new UserForm(root, user);
  userform.render();
} else {
  throw new Error("Root element not found");
}
