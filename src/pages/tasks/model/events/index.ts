import { createEvent } from "effector";
import { GetPlanForMonth, PlanStatusChanged } from "../types";

export const pageMounted = createEvent<GetPlanForMonth>();

export const plansForMonthFetched = createEvent<GetPlanForMonth>();
export const plansForDayFetched = createEvent<GetPlanForMonth>();
export const planStatusChanged = createEvent<PlanStatusChanged>();
