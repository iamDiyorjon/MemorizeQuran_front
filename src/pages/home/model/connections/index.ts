import { sample } from "effector";
import { pageMounted } from "../events";
import { getAllIssuesFx } from "@/shared/state";

sample({
  clock: pageMounted,
  target: getAllIssuesFx,
});
