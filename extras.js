const getToken = async () => {
    const tokenEndpoint =
      "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    const clientId = "62b11765-73c6-4502-85ec-e8951057124b";
    const clientSecret = "Gb-8Q~2kLnD-_X2dZLsc4m7FhUqQgXyYAi7X.cAG";
    const redirectUri = "http://localhost:3000/dashboard";

    const tokenResponse = await axios.post(tokenEndpoint, null, {
      params: {
        client_id: clientId,
        scope:
          "openid profile https://graph.microsoft.com/Calendars.Read https://graph.microsoft.com/Calendars.ReadWrite",
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        client_secret: clientSecret,
      },
    });

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // Store or use the access token and refresh token as needed
    console.log("Full Token:", tokenResponse);
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
  };
  if (code) {
    // getToken();
  }