import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import jwt_decode from "jwt-decode";

interface BaseUser {
  // email: string
  // username: string
  // first_name: string
  // last_name: string
  user_id: number;
}

type AuthState<T> = {
  access: string;
  refresh: string;
  is_authenticated: boolean;
  user: BaseUser;

  set_tokens: (tokens: { access?: string; refresh?: string }) => void;
  set_user: (user: { email?: string; username?: string }) => void;
  logout: () => void;
};

const DEFAULT_USER = {
  access: "",
  refresh: "",
  is_authenticated: false,
  user: {
    //  email: "",
    //  username: "",
    //  first_name: "",
    //  last_name: "",
    user_id: -1,
  },
};

const vanillaAuthState = create<AuthState<unknown>>()(
  devtools(
    persist(
      (set, get) => ({
        access: "",
        refresh: "",
        is_authenticated: false,
        user: {
          // email: "",
          // username: "",
          // first_name: "",
          // last_name: "",
          user_id: -1,
        },
        set_tokens: (token) =>
          set((old_value) => {
            const new_value = {
              access: token.access ?? old_value.access,
              refresh: token.refresh ?? old_value.refresh,
            } as AuthState<unknown>;
            if (token.access != undefined) {
              new_value.user = token_to_base_user(token.access);
            } else if (token.refresh != undefined) {
              new_value.user = token_to_base_user(token.refresh);
            }
            new_value.is_authenticated = new_value.user.user_id >= 0;
            return new_value;
          }),
        set_user: (user) =>
          set((old_value) => ({ user: old_value.user, ...user })),
        logout: () =>
          set((old_value) => {
            const response = { ...old_value, ...DEFAULT_USER };
            console.log(response, old_value);
            return response;
          }),
      }),
      {
        name: "auth_store",
      }
    )
  )
);

const useAuthState = vanillaAuthState as {
  <T>(): AuthState<T>;
  <T, U>(selector: (s: AuthState<T>) => U): U;
};

export { useAuthState, vanillaAuthState };

export function token_to_base_user(token: string): BaseUser {
  const decoded = jwt_decode(token) as BaseUser;
  return decoded;
}
