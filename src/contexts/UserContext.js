// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUser } from "../services/user.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const scope = urlParams.get("scope");

    if (code && scope && user?.sub.includes("google-oauth2")) {
      localStorage.setItem("googleCode", code);
      // const newUrl = window.location.origin + window.location.pathname;
      // window.location.replace(newUrl);
    }

    if (
      (code &&
        (scope === null || !scope) &&
        user?.sub.includes("windowslive")) ||
      user?.sub.includes("waad")
    ) {
      localStorage.setItem("microsoftCode", code);
    }
  }, [user]);

  useEffect(() => {
    const handleUserSignup = async () => {
      if (isAuthenticated && user) {
        try {
          const userPayload = {
            name: user?.name,
            email: user?.email,
            imageUrl: user?.picture,
            platform: user?.sub.includes("google-oauth2")
              ? "google"
              : "microsoft",
            code: user?.sub.includes("google-oauth2")
              ? localStorage.getItem("googleCode")
              : localStorage.getItem("microsoftCode"),
          };
          const response = await saveUser(userPayload);
          if (response.status) {
            // Set the user data in your context
            setAuthUser({
              ...response?.data?.data,
            });
          } else {
            // Handle the error
          }
        } catch (error) {
          console.error("UserContext: ", error);
        }
      }
    };

    handleUserSignup();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Use this hook to access the auth context
export const useAuth = () => useContext(AuthContext);
