import React, { useEffect, useState } from "react";
import ShortCalendar from "../../components/calendar/ShortCalendar";
import ServiceCard from "../../components/service-card/ServiceCard";
import ListCard from "../../components/service-card/ListCard";
import CalendarS from "../../components/calendar/CalendarS";
import CalendarDayPilot from "../../components/calendar/CalendarDayPilot";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GetGoogleAuthConfig,
  GetGoogleCalendarEvents,
  redirectToGoogleAuth,
} from "../../services/googleCalendar.service";
import { IsUserHasAccessToken } from "../../services/user.service";
import {
  GetMicrosoftCalendarEvents,
  getAuthUrl,
  redirectToMicrosoftAuth,
} from "../../services/microsoftCalendar.service";
import { getTimeRange } from "../../utils/helpers";

export default function DashboardView() {
  const [events, setEvents] = useState([]);
  const { isLoading, user } = useAuth0();
  const [tokenObj, setTokenObj] = useState(null);

  useEffect(() => {
    const token = {};
    const queryStringWithHash = window.location.hash.substring(1);
    const query = new URLSearchParams(queryStringWithHash);
    query.forEach((value, key) => {
      token[key] = value;
    });
    console.log("tokenObjjjj1: ", token);
    if (Object.keys(token).length > 0) {
      //   console.log("tokenObjjjj2: ", token);
      console.log(
        "tokenObjjjj2: ",
        Object.keys(token).length > 0 ? token : null
      );
      setTokenObj(token);
    }
    console.log("tokenObjjjj3: ", token);
  }, []);

  const code = new URLSearchParams(window.location.search);
  code.forEach((value, key) => {
    console.log("codeee: ", value, key);
  });

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
          console.log("events: ", events);
        } else {
          if (!response?.data?.data && !code && !isLoading)
            redirectToGoogleAuth();
        }
      } else if (user?.sub?.includes("windowslive")) {
        const response = await IsUserHasAccessToken({
          email: email,
          platform: "microsoft",
        });
        if (response?.data?.data) {
          const events = await getEvents("microsoft");
          console.log("events: ", events);
        } else {
          if (!response?.data?.data && !isLoading) redirectToMicrosoftAuth();
        }
      }
    };
    CheckUserStatus(user?.email);
  }, []);

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
        setEvents(googleEvents?.data?.data);
        break;
      case "microsoft":
        if (tokenObj) params.accessToken = tokenObj;
        const microsoftEvents = await GetMicrosoftCalendarEvents(params);
        console.log("responseeee: ", microsoftEvents);
        // setEvents(microsoftEvents?.data?.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {console.log("tokenObjjjj4: ", tokenObj)}
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
            <ServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}
