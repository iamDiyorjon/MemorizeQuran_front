import { sample } from "effector";
import { createIssueFx } from "../effects";
import { issueCreated } from "../events";

sample({
  clock: issueCreated,
  target: createIssueFx,
});
sample({
  clock: createIssueFx.doneData,
  fn: () => {
    alert("Issue created");
  },
});
