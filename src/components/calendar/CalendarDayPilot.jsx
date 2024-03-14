import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./Calendar"
import { format } from "date-fns";

const CalendarDayPilot = ({ events }) => {
  const [config, setConfig] = useState({
    viewType: "Week",
    headerDateFormat: "dddd dd",
  });
  console.log("eventsssss: ", events);
  const calendarRef = useRef();
  useEffect(
    () =>
      setConfig({
        ...config,
        events: events.map((event) => ({
          id: event.id,
          text: event?.summary || event?.subject,
          start: format(new Date(event?.start?.dateTime + 'Z'), "yyyy-MM-dd'T'HH:mm:ss"),//event?.start?.dateTime,
          end: format(new Date(event?.end?.dateTime + 'Z'), "yyyy-MM-dd'T'HH:mm:ss"),//event?.end?.dateTime,
        })),
      }),
    [events]
  );

  return (
    <>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </>
  );
};

export default CalendarDayPilot;
