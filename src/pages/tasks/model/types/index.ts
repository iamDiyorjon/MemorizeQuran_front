export interface GetPlanForMonth {
  userId: number | undefined;
  date: string;
}

export interface PlanStatusChanged {
  date: string;
  planId: number;
}
