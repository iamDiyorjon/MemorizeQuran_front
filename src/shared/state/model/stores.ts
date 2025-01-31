import { User } from "@/shared/models";
import { createStore } from "effector";

export const $currentUser = createStore<User | null>(null);
