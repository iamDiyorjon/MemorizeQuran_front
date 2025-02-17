import { sample } from "effector";
import {
  appInitialized,
  locationAttached,
  navigateAttached,
  navigated,
  userNotFound,
} from "./events";
import {
  getAllIssuesFx,
  getAllSurahsFx,
  getUserFx,
  navigateFx,
  postUserFx,
} from "./effects";
import { getTelegramId } from "./lib";
import {
  $allIssues,
  $allSurahs,
  $currentUser,
  $location,
  $navigate,
} from "./stores";
import { NavigateParams } from "./types";

//* Navigation
sample({
  clock: navigateAttached,
  target: $navigate,
});
sample({
  clock: navigated,
  fn: (payload): NavigateParams =>
    typeof payload === "string" ? { to: payload } : payload,
  target: navigateFx,
});
sample({
  clock: locationAttached,
  target: $location,
});
//* App Initialization
sample({
  clock: appInitialized,
  filter: () => {
    const telegramId = getTelegramId();
    if (!telegramId) {
      return false;
    }
    return true;
  },
  fn: () => getTelegramId(),
  target: getUserFx,
});

//* If user not found navigate to not registered page
sample({
  clock: appInitialized,
  filter: () => {
    const id = getTelegramId();
    if (!id) {
      console.log("Telegram ID not found");
      return true;
    }
    return false;
  },
  fn: () => "/notRegistered",
  target: navigated,
});

sample({
  clock: getUserFx.doneData,
  filter: (user) => user.isExisting,
  target: $currentUser,
});

//* If user not found, register him
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
  clock: postUserFx.doneData,
  filter: ({ id }) => {
    if (!id) {
      return false;
    }
    return true;
  },
  fn: ({ id }) => "/",
  target: navigated,
});

sample({
  clock: appInitialized,
  target: getAllSurahsFx,
});

sample({
  clock: getAllSurahsFx.doneData,
  target: $allSurahs,
});

sample({
  clock: getAllIssuesFx.doneData,
  target: $allIssues,
});
