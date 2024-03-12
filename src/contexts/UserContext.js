// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUser } from "../services/user.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const code = new URLSearchParams(window.location.search).get("code");
  const scope = new URLSearchParams(window.location.search).get("scope");
  if (code && scope && code !== null && scope !== null) {
    localStorage.setItem("googleCode", code);
  }
  if(code && code !== null && scope === null) {
    localStorage.setItem("microsoftCode", code);
  }


  const token = {};
  const queryStringWithHash = window.location.hash.substring(1);
  const query = new URLSearchParams(queryStringWithHash);
  query.forEach((value, key) => {
    token[key] = value;
  });
  if (Object.keys(token).length > 0) {
    localStorage.setItem("microsoftToken", JSON.stringify(token));
    console.log("tokenObjjjj2: ", Object.keys(token).length > 0 ? token : null);
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
            if (response.status) {
              // Set the user data in your context
              setAuthUser({
                ...response?.data?.data,
              });
            } else {
              // Handle the error
            }
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
