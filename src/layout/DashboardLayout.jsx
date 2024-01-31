import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./dashboard-layout.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
  const { isLoading, user } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      {/* {isAuthenticated ? ( */}
      <div className={"dashboard-layout"}>
        <div className="min-h-full">
          <Header />
          <div className={"main-area"}>
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mt-2 flex items-center text-md text-white font-semibold">
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </div>
      {/* ) : (
        <>Loading...</>
      )} */}
    </>
  );
}
