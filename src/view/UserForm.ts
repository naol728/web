import { User } from "../models/User";
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventMap(): {
    [key: string]: () => void;
  } {
    return {
      "click:button": this.onButtonClick,
    };
  }
  onButtonClick(): void {
    console.log("button clicked");
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>
         <h2>Name: ${this.model.get("name")}</h2>
         <h2>Age: ${this.model.get("age")}</h2>
        </div>
        <input />
        <button>Submit</button>
      </div>
    `;
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventMap();
    for (let eventkey in eventsMap) {
      const [eventName, selector] = eventkey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventkey]);
      });
    }
  }
  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
