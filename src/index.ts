import { on, trigger } from "./events";

on("change", () => {
  console.log("change occurred");
});

trigger("change");
