import {
  getRepetitionPlanForDay,
  getRepetitionPlanForMonth,
} from "@/shared/api";
import { createEffect } from "effector";
import { GetPlanForMonth } from "../types";

export const getRepetitionPlanForMonthFx = createEffect(
  (payload: GetPlanForMonth) => {
    const { userId, date } = payload;
    return getRepetitionPlanForMonth(userId, date);
  }
);

export const getRepetitionPlanForDayFx = createEffect(
  (payload: GetPlanForMonth) => {
    const { userId, date } = payload;
    return getRepetitionPlanForDay(userId, date);
  }
);
