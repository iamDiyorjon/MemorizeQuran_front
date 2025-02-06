import axios, { AxiosError } from "axios";
import { notification } from "../lib";

export const handleError = (error: unknown) => {
  let message = "";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data;

      message = `Error: ${status} ${JSON.stringify(data)}`;

      console.error(`Error: ${status}`, data);

      if (status === 401) {
      } else if (status === 404) {
      }
    } else if (axiosError.request) {
      message = `No response received: ${JSON.stringify(axiosError.request)}`;
      console.error("No response received:", axiosError.request);
    } else {
      message = JSON.stringify(axiosError.message);
      console.error("Error:", axiosError.message);
    }
  } else {
    message = `Unexpected error: ${JSON.stringify(error)}`;
    console.error("Unexpected error:", error);
  }

  notification.show({
    title: "Error",
    message,
    color: "red",
    autoClose: true,
  });
};
