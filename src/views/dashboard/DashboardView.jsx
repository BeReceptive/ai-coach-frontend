import React, { useEffect, useState } from "react";
import ShortCalendar from "../../components/calendar/ShortCalendar";
import ServiceCard from "../../components/service-card/ServiceCard";
import ListCard from "../../components/service-card/ListCard";
import CalendarS from "../../components/calendar/CalendarS";
import CalendarDayPilot from "../../components/calendar/CalendarDayPilot";
import { useAuth0 } from "@auth0/auth0-react";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";

export default function DashboardView() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth0();
  useEffect(() => {
    const getEvents = async () => {
      const now = new Date();
      const firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay())
      );
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      const response = await GetGoogleCalendarEvents({
        userEmail: user?.email,
        timeMin: firstDayOfWeek.toISOString(),
        timeMax: lastDayOfWeek.toISOString(),
      });
      setEvents(response?.data?.data);
    };
    getEvents();
  }, []);
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
