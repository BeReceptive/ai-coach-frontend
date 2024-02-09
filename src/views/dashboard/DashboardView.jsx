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
} from "../../services/googleCalendar.service";
import { IsUserHasGoogleAccessToken } from "../../services/user.service";
import { GetMicrosoftCalendarEvents } from "../../services/microsoftCalendar.service";

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

  // useEffect(() => {
  //   if (Object.keys(token).length > 0) {
  //     const getMicrosoftEvents = async () => {};
  //     getMicrosoftEvents();
  //   }
  // }, [token]);
  const code = new URLSearchParams(window.location.search);
  code.forEach((value, key) => {
    console.log("codeee: ", value, key);
  });

  useEffect(() => {
    if (user?.sub?.includes("google-oauth2")) {
      // check if user has google access token
      // if not redirect to google auth
      // if yes then fetch events
      const CheckUserStatus = async (email) => {
        const code = new URLSearchParams(window.location.search).get("code");
        const response = await IsUserHasGoogleAccessToken({
          email: email,
        });
        if (response?.data?.data) {
          const events = await getEvents();
          console.log("events: ", events);
        } else {
          if (!response?.data?.data && !code && !isLoading)
            redirectToGoogleAuth();
        }
      };
      CheckUserStatus(user?.email);
    }
  }, []);

  const getEvents = async () => {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    if (user?.sub?.includes("google-oauth2")) {
      const code = new URLSearchParams(window.location.search).get("code");
      const GCparams = {
        userEmail: user?.email,
        timeMin: firstDayOfWeek.toISOString(),
        timeMax: lastDayOfWeek.toISOString(),
        code: localStorage.getItem("googleCode"),
        type: "eventsssss"
      };
      // GCparams.code = localStorage.getItem("code");
      const response = await GetGoogleCalendarEvents(GCparams);
      setEvents(response?.data?.data);
      return response?.data?.data;
    } else {
      const MCparams = {
        userEmail: user?.email,
        timeMin: firstDayOfWeek.toISOString(),
        timeMax: lastDayOfWeek.toISOString(),
      };
      console.log("tokenObj: ", tokenObj);
      if (tokenObj) MCparams.accessToken = tokenObj;
      const response = await GetMicrosoftCalendarEvents(MCparams);
      console.log("responseeee: ", response);
      // setEvents(response?.data?.value);
    }
  };

  const redirectToGoogleAuth = () => {
    const googleAuthConfig = GetGoogleAuthConfig();
    console.log("googleAuthConfig: ", googleAuthConfig);
    const client =
      window.google.accounts.oauth2.initCodeClient(googleAuthConfig);
    client.requestCode();
  };

  // useEffect(() => {
  //   const getEvents = async () => {
  //     const now = new Date();
  //     const firstDayOfWeek = new Date(
  //       now.setDate(now.getDate() - now.getDay())
  //     );
  //     const lastDayOfWeek = new Date(firstDayOfWeek);
  //     lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  //     if (!user?.sub?.includes("google-oauth2")) {
  //       const code = new URLSearchParams(window.location.search).get("code");
  //       const GCparams = {
  //         userEmail: user?.email,
  //         timeMin: firstDayOfWeek.toISOString(),
  //         timeMax: lastDayOfWeek.toISOString(),
  //       };
  //       if (code) GCparams.code = code;
  //       const response = await GetGoogleCalendarEvents(GCparams);
  //       setEvents(response?.data?.data);
  //     } else {
  //       const MCparams = {
  //         userEmail: user?.email,
  //         timeMin: firstDayOfWeek.toISOString(),
  //         timeMax: lastDayOfWeek.toISOString(),
  //       };
  //       console.log("tokenObj: ", tokenObj);
  //       if (tokenObj) MCparams.accessToken = tokenObj;
  //       const response = await GetMicrosoftCalendarEvents(MCparams);
  //       console.log("responseeee: ", response);
  //       // setEvents(response?.data?.value);
  //     }
  //   };
  //   getEvents();
  // }, [isLoading, tokenObj]);
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
