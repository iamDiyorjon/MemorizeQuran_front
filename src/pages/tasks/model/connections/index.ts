import { sample } from "effector";
import {
  pageMounted,
  plansForDayFetched,
  plansForMonthFetched,
  planStatusChanged,
} from "../events";
import {
  changePlanStatusFx,
  getRepetitionPlanForDayFx,
  getRepetitionPlanForMonthFx,
} from "../effects";
import { $planForDay, $planForMonth } from "../stores";
import { $currentUser } from "@/shared/state";

sample({
  clock: pageMounted,
  target: [getRepetitionPlanForMonthFx, getRepetitionPlanForDayFx],
});

sample({
  clock: plansForMonthFetched,
  target: getRepetitionPlanForMonthFx,
});
sample({
  clock: plansForDayFetched,
  target: getRepetitionPlanForDayFx,
});

sample({
  clock: getRepetitionPlanForMonthFx.doneData,
  fn: (data) => {
    return data.filter((plan) => plan.day !== new Date().getDate());
  },
  target: $planForMonth,
});

sample({
  clock: getRepetitionPlanForDayFx.doneData,
  target: $planForDay,
});

sample({
  clock: planStatusChanged,
  target: changePlanStatusFx,
});

sample({
  clock: changePlanStatusFx.done,
  source: $currentUser,
  fn: (source, clock) => {
    return {
      userId: source?.userId,
      date: clock.params.date,
    };
  },
  target: plansForDayFetched,
});
