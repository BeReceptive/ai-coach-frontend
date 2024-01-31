import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const IntegrateGoogleCalendar = async () => {
  const response = await GET(`${apiUrl.googleCalendar}/integrate`);
  return response;
};

export const GetGoogleCalendarEvents = async (params) => {
  const response = await GET(`${apiUrl.googleCalendar}/events`, params);
  return response;
};
