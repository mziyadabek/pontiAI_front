import type { NitroFetchRequest, $Fetch } from "nitropack";
import type { SignInDTO, SignUpDTO } from "~/types/auth";

export default (ofetch: $Fetch<any, NitroFetchRequest>) => ({
  signUp: async (payload: SignUpDTO) => {
    const data = await ofetch("/auth/register", {
      method: "POST",
      body: payload,
    });

    return data;
  },

  signIn: async (payload: SignInDTO) => {
    const data = await ofetch("/auth/login", {
      method: "POST",
      body: payload,
    });

    return data;
  },

  signOut: () => {},

  getMe: async () => {
    const data = await ofetch("/auth/me", {
      method: "GET",
    });

    return data;
  },
});