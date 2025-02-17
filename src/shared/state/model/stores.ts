import { Issue, Surah, User } from "@/shared/models";
import { createStore } from "effector";
import { pending } from "patronum";
import { getAllIssuesFx, getAllSurahsFx } from "./effects";
import { Location, NavigateFunction } from "react-router";
export const $currentUser = createStore<User | null>(null);

export const $allSurahs = createStore<Surah[]>([]);
export const $allIssues = createStore<Issue[]>([]);

export const $navigate = createStore<NavigateFunction | null>(null);
export const $location = createStore<Location | null>(null);
