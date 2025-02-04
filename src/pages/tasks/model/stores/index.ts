import { RepetitionPlan, RepetitionPlanDay } from "@/shared/models";
import { createStore } from "effector";
import { pending } from "patronum";
import {
  getRepetitionPlanForDayFx,
  getRepetitionPlanForMonthFx,
} from "../effects";

export const $planForMonth = createStore<RepetitionPlanDay[]>([]);
export const $planForDay = createStore<RepetitionPlan[]>([]);

export const $isLoadingPlanForMonth = pending([getRepetitionPlanForMonthFx]);
export const $isLoadingPlanForDay = pending([getRepetitionPlanForDayFx]);
