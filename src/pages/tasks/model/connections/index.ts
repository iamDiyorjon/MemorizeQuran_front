import { sample } from "effector";
import { pageMounted, plansForDayFetched } from "../events";
import {
  getRepetitionPlanForDayFx,
  getRepetitionPlanForMonthFx,
} from "../effects";
import { $planForDay, $planForMonth } from "../stores";

sample({
  clock: pageMounted,
  target: [getRepetitionPlanForMonthFx, getRepetitionPlanForDayFx],
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
