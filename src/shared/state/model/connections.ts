import { sample } from "effector";
import { appInitialized } from "./events";
import {
  getAllIssuesFx,
  getAllSurahsFx,
  getUserFx,
  postUserFx,
} from "./effects";
import { getTelegramId } from "./lib";
import { $allIssues, $allSurahs, $currentUser } from "./stores";
import WebApp from "@twa-dev/sdk";

//* App Initialization
sample({
  clock: appInitialized,
  fn: () => getTelegramId(),
  target: getUserFx,
});
sample({
  clock: getUserFx.doneData,
  filter: (user) => user.isExisting,
  target: $currentUser,
});

//* If user not found, register him
sample({
  clock: getUserFx.done,
  filter: (user) => {
    if (!user.result.isExisting && getTelegramId()) {
      return true;
    }
    return false;
  },
  fn: (clock) => {
    return { telegramId: clock.params, fullName: "New User" };
  },
  target: postUserFx,
});
sample({
  clock: postUserFx.doneData,
  target: $currentUser,
});

sample({
  clock: appInitialized,
  target: getAllSurahsFx,
});

sample({
  clock: getAllSurahsFx.doneData,
  target: $allSurahs,
});

// sample({
//   clock: postUserFx.doneData,
//   filter: (c) => c.isExisting,
//   fn: (c) => c.userId,
//   target: getAllIssuesFx,
// });

sample({
  clock: getAllIssuesFx.doneData,
  target: $allIssues,
});
