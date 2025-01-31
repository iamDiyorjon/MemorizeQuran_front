import { sample } from "effector";
import { appInitialized } from "./events";
import { getUserFx } from "./effects";
import { getTelegramId } from "./lib";
import { $currentUser } from "./stores";

//* App Initialization
sample({
  clock: appInitialized,
  fn: () => 970956519,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $currentUser,
});
