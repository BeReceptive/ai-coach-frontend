import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";


export const getCoachInsightsByQuery = async (params) => {
  const response = await GET(`${apiUrl.coachInsights}`, params);
  return response;
};
