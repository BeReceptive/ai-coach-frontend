import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const GetMicrosoftCalendarEvents = async (params) => {
  const response = await GET(`${apiUrl.microsoftCalendar}/events`, params);
  return response;
};

export const getAuthUrl = () => {
  const redirectUri = process.env.REACT_APP_MICROSOFT_CALENDAR_REDIRECT_URL;
  const clientId = process.env.REACT_APP_MICROSOFT_CALENDAR_CLIENT_ID;
  const scope =
    "openid profile https://graph.microsoft.com/Calendars.Read https://graph.microsoft.com/Calendars.ReadWrite";

  // const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token token&scope=${scope}&nonce=12345`;

  // Redirect the user to the Microsoft login page
  return authUrl;
};

export const redirectToMicrosoftAuth = () => {
  const authUrl = getAuthUrl();
  // Redirect the user to the Microsoft login page
  window.location.href = authUrl;
};
