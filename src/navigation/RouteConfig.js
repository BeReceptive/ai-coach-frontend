import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import PrivateRoute from "../components/common/PrivateRoute";
import DashboardView from "../views/dashboard/DashboardView";
import DashboardLayout from "../layout/DashboardLayout";
import AddProfile from "../views/profile/AddProfile";
import { AuthProvider } from "../contexts/UserContext";
import FeedbackPage from "../components/service-card/FeedbackPage";

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate(window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

function RouteConfig() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Auth0ProviderWithRedirectCallback
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        // audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<DashboardLayout></DashboardLayout>}> */}
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute component={DashboardView} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute component={AddProfile} />}
            />
            <Route
              path="/feedback"
              element={<FeedbackPage />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Auth0ProviderWithRedirectCallback>
  );
}

export default RouteConfig;
