import axios from "axios";

const baseUrl = "http://34.140.237.148:8000/api";

export const userLogin = (email: string, password: string) => {
  const url = `${baseUrl}/login`;

  return axios
    .post(
      url,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response && response.status === 200) {
        return Promise.resolve(response.data);
      }

      return Promise.reject();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
