import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const saveUser = async (user) => {
  const response = await POST(`${apiUrl.user}`, user);
  return response;
};

export const IsUserHasGoogleAccessToken = async (data) => {
  const response = await GET(`${apiUrl.user}/check-if-token-exists`, data);
  return response;
}