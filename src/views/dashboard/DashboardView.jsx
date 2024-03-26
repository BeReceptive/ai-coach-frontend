import React, { useContext, useEffect, useState } from "react";
import ServiceCard from "../../components/service-card/ServiceCard";
import ListCard from "../../components/service-card/ListCard";
import CalendarDayPilot from "../../components/calendar/CalendarDayPilot";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GetGoogleCalendarEvents,
  redirectToGoogleAuth,
} from "../../services/googleCalendar.service";
import { IsUserHasAccessToken } from "../../services/user.service";
import {
  GetMicrosoftCalendarEvents,
  redirectToMicrosoftAuth,
} from "../../services/microsoftCalendar.service";
import { getTimeRange } from "../../utils/helpers";
import { useAuth } from "../../contexts/UserContext";

export default function DashboardView() {
  const { authUser } = useAuth();
  const [events, setEvents] = useState([]);
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    const CheckUserStatus = async (email) => {
      if (user?.sub?.includes("google-oauth2")) {
        const code = new URLSearchParams(window.location.search).get("code");
        const response = await IsUserHasAccessToken({
          email: email,
          platform: "google",
        });
        if (response?.data?.data) {
          const events = await getEvents("google");
        } else if (!response?.data?.data && !code && !isLoading) {
          redirectToGoogleAuth();
        }
      } else if (
        user?.sub?.includes("windowslive") ||
        user?.sub?.includes("waad")
      ) {
        const code = new URLSearchParams(window.location.search).get("code");
        const response = await IsUserHasAccessToken({
          email: email,
          platform: "microsoft",
        });
        if (response?.data?.data) {
          const events = await getEvents("microsoft");
        } else {
          if (!response?.data?.data && !isLoading && !code) {
            redirectToMicrosoftAuth();
          }
        }
      }
    };
    CheckUserStatus(user?.email);
  }, [user, isLoading, authUser]);

  const removeQueryParams = () => {
    if (window.location.search) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  };

  const getEvents = async (platform) => {
    const { timeMin, timeMax } = getTimeRange();
    const params = {
      userEmail: user?.email,
      timeMin: timeMin,
      timeMax: timeMax,
      type: "events",
    };
    switch (platform) {
      case "google":
        if (localStorage.getItem("googleCode"))
          params.code = localStorage.getItem("googleCode");
        const googleEvents = await GetGoogleCalendarEvents(params);
        removeQueryParams();
        setEvents(googleEvents?.data?.data);
        break;
      case "microsoft":
        if (localStorage.getItem("microsoftCode"))
          params.code = localStorage.getItem("microsoftCode");
        try {
          const microsoftEvents = await GetMicrosoftCalendarEvents(params);
          removeQueryParams();
          setEvents(microsoftEvents?.data?.data);
        } catch (error) {
          if (error.response.status === 401) {
            redirectToMicrosoftAuth();
          }
          console.log("errorrrrr: ", error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div>
            <CalendarDayPilot events={events} />
          </div>
        </div>
      </div>
      <div className="container mx-auto my-5">
        <div className="flex">
          <div className="flex-1">
            <ListCard />
          </div>
        </div>
      </div>
      <div className="container mx-auto my-5">
        <div className="flex">
          <div className="flex-1">
            {/* <h3 className={"text-black text-2xl text-left mb-3"}>
              Coach Insights
            </h3> */}
            <ServiceCard isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
