import { User } from "../models";
import { api } from "./_base";

export const getUser = async (telegramId: number): Promise<User> => {
  const response = await api.get("/User", {
    params: {
      telegramId,
    },
  });
  return response.data;
};
