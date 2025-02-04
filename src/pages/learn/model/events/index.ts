import { PostIssue } from "@/shared/models";
import { createEvent } from "effector";

export const issueCreated = createEvent<PostIssue>();
