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
      return result.data;
    }
  } catch (error) {
    return error;
  }
};
