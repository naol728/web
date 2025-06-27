import { User } from "./models/User";

const user = new User({ id: 1 });

user.on("change", () => {
  console.log(`User changed: ${user.get("name")}, Age: ${user.get("age")}`);
});

user.fetch();
