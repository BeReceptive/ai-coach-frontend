// msalConfig.js
import { Configuration } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CALENDAR_CLIENT_ID,
    authority: process.env.MICROSOFT_CALENDAR_AUTHORITY,
    redirectUri: process.env.MICROSOFT_CALENDAR_REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};