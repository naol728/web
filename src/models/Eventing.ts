type CallBack = () => void;

export class Eventing {
  events: { [key: string]: CallBack[] } = {};

  on = (eventName: string, callback: CallBack): void => {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  };
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  };
}
