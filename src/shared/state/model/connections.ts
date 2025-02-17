import { sample } from "effector";
import { appInitialized, userNotFound } from "./events";
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
  filter: () => {
    const telegramId = getTelegramId();
    if (!telegramId) {
      console.log("Telegram ID not found");
      return false;
    }
    return true;
  },
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
    if (!user.result.isExisting) {
      console.log("User not found, registering");
      return true;
    }
    console.log("User found, skipping registration");
    return false;
  },
  fn: (clock) => {
    return { telegramId: clock.params, fullName: "New User" };
  },
  target: userNotFound,
});
sample({
  clock: userNotFound,
  target: postUserFx,
});

sample({
  clock: postUserFx.doneData,
  fn: ({ id }) => id,
  target: getUserFx,
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
