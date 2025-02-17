import { createEvent } from "effector";

export const appInitialized = createEvent();
export const userFound = createEvent();
export const userNotFound = createEvent<{
  telegramId: number;
  fullName: string;
}>();
