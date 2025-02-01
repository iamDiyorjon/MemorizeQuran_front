import { getAllSurahs, getUser, postUser } from "@/shared/api";
import { createEffect } from "effector";

export const getUserFx = createEffect((id: number) => {
  return getUser(id);
});

export const postUserFx = createEffect((body: any) => {
  return postUser(body);
});

//* Other effects
export const getAllSurahsFx = createEffect(() => {
  return getAllSurahs();
});
