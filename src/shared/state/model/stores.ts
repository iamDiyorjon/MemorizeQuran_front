import { Issue, Surah, User } from "@/shared/models";
import { createStore } from "effector";
import { pending } from "patronum";
import { getAllIssuesFx, getAllSurahsFx } from "./effects";
export const $currentUser = createStore<User | null>(null);

export const $allSurahs = createStore<Surah[]>([]);
export const $allIssues = createStore<Issue[]>([]);
//* Loading
export const $isLoading = pending([getAllIssuesFx, getAllSurahsFx]);
