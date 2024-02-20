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

export const GetGoogleAuthConfig = () => {
  const googleAuthConfig = {
    client_id: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID, //your client id created in cloud console,
    scope: "https://www.googleapis.com/auth/calendar",
    ux_mode: "redirect",
    redirect_uri: `${window.location.origin}/dashboard`, // Set your redirect URI
  }
  return googleAuthConfig;
}

export const redirectToGoogleAuth = () => {
  const googleAuthConfig = GetGoogleAuthConfig();
  const client =
    window.google.accounts.oauth2.initCodeClient(googleAuthConfig);
  client.requestCode();
};