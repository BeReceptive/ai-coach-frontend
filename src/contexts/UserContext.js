// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUser } from "../services/user.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const shop = JSON.parse(localStorage.getItem("shop"))?.shop;

  const code = new URLSearchParams(window.location.search).get("code");
  if(code) {
    localStorage.setItem("code", code);
  }

  useEffect(() => {
    const handleUserSignup = async () => {
      if (isAuthenticated && user) {
        try {
          const userPayload = {
            name: user?.name,
            email: user?.email,
            imageUrl: user?.picture,
          };
          if (user) {
            const response = await saveUser(userPayload);
            console.log("UserContext: ", response?.data?.data, response);
            if (response.user) {
              // Set the user data in your context
              setAuthUser({
                ...response.user,
              });
            } else {
              // Handle the error
            }
          }
        } catch (error) {
          console.error("UserContext: ", error);}
      }
    };

    handleUserSignup();
  }, [user, isAuthenticated, getAccessTokenSilently, shop]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Use this hook to access the auth context
export const useAuth = () => useContext(AuthContext);
