import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const saveFeedback = async (feedback) => {
  const response = await POST(`${apiUrl.feedback}`, feedback);
  return response;
};