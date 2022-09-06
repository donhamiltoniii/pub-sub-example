import { Callback } from "./types";
import { on, trigger } from "./events";

export class View {
  private data: { [key: string]: any };

  constructor(protected parent: Element) {
    this.data = {};

    on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    Object.entries(eventsMap).forEach(([key, value]) => {
      const [selector, eventName] = key.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, value);
      });
    });
  }

  eventsMap(): { [key: string]: Callback } {
    return {
      ".example-view__button:click": this.handleButtonClick,
    };
  }

  get(key: string) {
    return this.data[key];
  }

  handleButtonClick = () => {
    const { value } = document.querySelector(
      ".example-view__input"
    ) as HTMLInputElement;

    this.set({ name: value });
    trigger("change");
  };

  render() {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();

    this.bindEvents(templateEl.content);

    this.parent.innerHTML = "";
    this.parent.append(templateEl.content);
  }

  set = (update: { [key: string]: any }): void => {
    this.data = { ...this.data, ...update };
  };

  template() {
    return `
        <div class="example-view">
            <span>Hello, my name is ${this.get("name")} and I'm dumb.</span>
            <input class="example-view__input">
            <button class="example-view__button">submit</button>
        </div>
    `;
  }
}
