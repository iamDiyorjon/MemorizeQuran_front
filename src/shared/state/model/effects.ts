import { getUser } from "@/shared/api";
import { createEffect } from "effector";

export const getUserFx = createEffect((id: number) => {
  return getUser(id);
});
