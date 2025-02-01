import { Surah, User } from "@/shared/models";
import { createStore } from "effector";

export const $currentUser = createStore<User | null>(null);

export const $allSurahs = createStore<Surah[]>([]);
