import { createEvent } from "effector";
import { GetPlanForMonth } from "../types";

export const pageMounted = createEvent<GetPlanForMonth>();

export const plansForDayFetched = createEvent<GetPlanForMonth>();
