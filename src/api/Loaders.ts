import { toast } from "react-toastify";
import { http, no_auth_http, post_form } from "./ApiManager";
import { BesoinDetails, DataBaseType, NewUserType, Step } from "../types/types";
import { vanillaAuthState } from "../store/auth_store";
import { vanillaBesoinStore } from "../store/besoin_store";

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

export const createDataForDB = async (data: Step) => {
  const input_data = new FormData()
  // input_data.append("family_code", data.family_code)
  // input_data.append("id_code", data.id_code)
  // input_data.append("condition", data.condition)
  // input_data.append("description", data.description)
  // input_data.append("icon", data.icon)
  // input_data.append("items_type", data.items_type)
  for (const key of Object.keys(data)){
    if (key == "help_documents"){
      let counter = 0
      for (const k of Object.keys(data.help_documents)){
        input_data.append(`doc_util_${counter}`, data.help_documents[counter])
        counter++
      }
      continue
    }
    input_data.append(key, data[key])
  }
  console.log(
    input_data.keys(),
    input_data.values()
  )
  try {
    const response = await http.post_form(`/step/list/`, input_data);
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


export const deleteStep = async (id: number) => {
  try {
    const response = await http.del(`/step/delete/${id}/`);
    if (response && response.status == 200) {
      toast.success("Etape effacée avec succès");
      console.log(response.data.results)
      return response.data.results;
    }
    return Promise.reject()
  } catch (error) {
    console.log(error);
    return Promise.reject()
  }
};


export const get_details_besoin = async (id: number) => {
  try {
    const response = await http.get(`/besoin/details/${id}`);
    if (response && response.status == 200) {
      //toast.success("Etape effacée avec succès");
      console.log(response.data)
      const data = response.data
      //vanillaBesoinStore.setState({active_besoin: data})
      return data
    }
    return Promise.reject()
  } catch (error) {
    console.log(error);
    return Promise.reject()
  }
};

export const save_step = async (data:{
  comment: string,
  files: File[],
  choices: string[],
  step_id: number,
  besoin_id: number
}) => {
  try {
    const form = new FormData()
    form.append("step_id", data.step_id.toString())
    form.append("besoin_id", data.besoin_id.toString())
    form.append("comment", data.comment)
    form.append("choices", data.choices.join())
    for (let i=0; i<data.files.length; i++){
      form.append(`file_${i}`, data.files[i])
    }

    const response = await post_form(`/step/ok/`, form );
    if (response && response.status == 200) {
      const data = response.data
      return data
    }
    return Promise.reject()
  } catch (error) {
    console.log(error);
    return Promise.reject()
  }
};

export const reset_step = async (besoin_id: number, step_id: number) => {
  try {
    const response = await http.post(`/step/nok/`, {besoin_id, step_id});
    if (response && response.status == 200) {
      console.log(response.data)
      const data = response.data
      return data
    }
    return Promise.reject()
  } catch (error) {
    console.log(error);
    return Promise.reject()
  }
};