import { toast } from "react-toastify";
import ApiManager from "./ApiManager";

export const userLogin = async (data: { email: string; password: string }) => {
  try {
    const result = await ApiManager("login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (result.status === 200) {
      toast.success("User Logged In successfully");
      return result.data;
    }
  } catch (error) {
    return error;
  }
};

export const getUser = async (token: string) => {
  try {
    const result = await ApiManager("me/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    return error;
  }
};
