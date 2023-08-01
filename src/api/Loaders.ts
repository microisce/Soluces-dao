import { toast } from "react-toastify";
import { http, no_auth_http } from "./ApiManager";
import { DataBaseTypes, NewUserType } from "../types/types";
import { vanillaAuthState } from "../store/auth_store";

export const requestOTP = async (email: string): Promise<boolean> => {
  const data = { email };
  try {
    const response = await no_auth_http("request_otp/", {
      method: "post",
      data,
    });
    if (response && response.status == 200) {
      console.log(response.data);
      toast.success("Veuillez verifier votre boite email");
      //vanillaAuthState.getState().set_tokens(response.data);
      return Promise.resolve(true);
    }
    toast.error("Email invalide ou compte inexistant");
    return Promise.resolve(false);
  } catch (error) {
    console.log(error);
    toast.error("Email invalide ou compte inexistant");
    return Promise.resolve(false);
  }
};

export const userLogin = async (data: {
  email: string;
  otp: string;
}): Promise<boolean> => {
  try {
    const response = await no_auth_http("login_v2/", { method: "post", data });
    if (response && response.status == 200) {
      console.log(response.data);
      //toast.success("Bonjour");
      vanillaAuthState.getState().set_tokens(response.data);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (error) {
    console.log(error);
    return Promise.resolve(false);
  }
};

export const getUser = async () => {
  try {
    const response = await http.get("me/");
    if (response && response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNeedsData = async () => {
  try {
    const response = await http.get("besoins/list/");
    if (response && response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNeed = async (designation: string) => {
  try {
    const response = await http.post("besoins/create/", { designation });
    if (response && response.status == 201) {
      Promise.resolve();
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const deleteNeed = async (rowId: number) => {
  try {
    const response = await http.del(`besoins/delete/${rowId}/`);
    if (response && response.status == 204) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};

export const createNewUser = async (data: NewUserType) => {
  try {
    const response = await http.post("/create_account/", { ...data });
    if (response && response.status == 200) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};

export const getAllUsers = async () => {
  try {
    const response = await http.get("/users/");
    if (response && response.status == 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await http.del(`/delete-user/${userId}/`);
    if (response && response.status == 200) {
      toast.success("Utilisateur supprimé avec succès", { toastId: "1" });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTypesList = async () => {
  try {
    const response = await http.get(`/item-type/list/`);
    if (response && response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createDataForDB = async (data: DataBaseTypes) => {
  const input_data = {
    ...data,
  };
  try {
    const response = await http.post(`/step/list/`, input_data);
    if (response && response.status == 200) {
      toast.success("Données créées avec succès");
      return response.data.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataForDB = async () => {
  try {
    const response = await http.get(`/step/list/`);
    if (response && response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getFamilyCodeChoices = async () => {
  try {
    const response = await http.get(`/step/family_codes/`);
    if (response && response.status == 200) {
      const list: string[] = response.data.map((item: { family_code: string; })=>item.family_code) ?? []
      return Array.from(new Set(list));
    }
    return []
  } catch (error) {
    console.log(error);
    return []
  }
};
