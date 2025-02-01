import { Issue, Surah, User } from "../models";
import { api } from "./_base";

//* User Actions
export const getUser = async (telegramId: number): Promise<User> => {
  const response = await api.get("/User", {
    params: {
      telegramId,
    },
  });
  return response.data.result;
};

export const postUser = async (body: any): Promise<User> => {
  const response = await api.post("/User", {
    telegramId: body.telegramId,
    fullName: body.fullName,
  });
  return response.data.result;
};

//* Other API
export const getAllSurahs = async (): Promise<Surah[]> => {
  const response = await api.get("/Surah/GeAllSurahs");
  return response.data;
};

export const getAllIssues = async (userId: number): Promise<Issue[]> => {
  const response = await api.get(
    `/Issues/GetAllIssue?userId=${userId}&pageNumber=1&pageCount=10`
  );
  return response.data;
};
