import {
  changePlanStatus,
  getRepetitionPlanForDay,
  getRepetitionPlanForMonth,
} from "@/shared/api";
import { createEffect } from "effector";
import { GetPlanForMonth, PlanStatusChanged } from "../types";

export const getRepetitionPlanForMonthFx = createEffect(
  (payload: GetPlanForMonth) => {
    const { userId, date } = payload;
    if (!userId) return [];
    return getRepetitionPlanForMonth(userId, date);
  }
);

export const getRepetitionPlanForDayFx = createEffect(
  (payload: GetPlanForMonth) => {
    const { userId, date } = payload;
    if (!userId) return [];
    return getRepetitionPlanForDay(userId, date);
  }
);

export const changePlanStatusFx = createEffect((payload: PlanStatusChanged) => {
  return changePlanStatus(payload.planId);
});
