import { Callback } from "./types";

interface Events {
  [key: string]: Callback[];
}

const events: Events = {};

export const on = (event: string, callback: Callback) => {
  if (!events[event]) {
    events[event] = [];
  }

  events[event].push(callback);
};

export const trigger = (event: string) => {
  events[event].forEach((callback: Callback) => {
    callback();
  });
};
