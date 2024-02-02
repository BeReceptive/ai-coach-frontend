import React, { useEffect, useState } from "react";
import ShortCalendar from "../../components/calendar/ShortCalendar";
import ServiceCard from "../../components/service-card/ServiceCard";
import ListCard from "../../components/service-card/ListCard";
import CalendarS from "../../components/calendar/CalendarS";
import CalendarDayPilot from "../../components/calendar/CalendarDayPilot";
import { useAuth0 } from "@auth0/auth0-react";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";
import { IsUserHasGoogleAccessToken } from "../../services/user.service";

export default function DashboardView() {
  const [events, setEvents] = useState([]);
  const { isLoading, user } = useAuth0();

  console.log("user", user);

  useEffect(() => {
    if (user?.sub?.includes("google-oauth2")) {
      // check if user has google access token
      // if not redirect to google auth
      // if yes then fetch events
      const CheckUserStatus = async (email) => {
        const response = await IsUserHasGoogleAccessToken({
          email: email,
        });
        const code = new URLSearchParams(window.location.search).get("code");
        if (!response?.data?.data && !code && !isLoading) {
          // redirect to google auth
          redirectToGoogleAuth();
        }
      };
      CheckUserStatus(user?.email);
    }
  }, []);

  const redirectToGoogleAuth = () => {
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID, //your client id created in cloud console,
      scope: SCOPES,
      ux_mode: "redirect",
      redirect_uri: `${window.location.origin}/dashboard`, // Set your redirect URI
    });
    client.requestCode();
  };

  useEffect(() => {
    const getEvents = async () => {
      const now = new Date();
      const firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay())
      );
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      const params = {
        userEmail: user?.email,
        timeMin: firstDayOfWeek.toISOString(),
        timeMax: lastDayOfWeek.toISOString(),
      };
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) params.code = code;

      if (user?.sub?.includes("google-oauth2")) {
        const response = await GetGoogleCalendarEvents(params);
        setEvents(response?.data?.data);
      }
    };
    getEvents();
  }, [isLoading]);
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
            <h3 className={"text-black text-2xl text-left mb-3"}>
              Coach Insights
            </h3>
            <ServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}
