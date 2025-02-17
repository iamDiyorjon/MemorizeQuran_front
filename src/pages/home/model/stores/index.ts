import { getAllIssuesFx, getAllSurahsFx } from "@/shared/state";
import { pending } from "patronum";

//* Loading
export const $isLoading = pending([getAllIssuesFx, getAllSurahsFx]);
