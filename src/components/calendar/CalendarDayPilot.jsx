import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const CalendarDayPilot = ({ events }) => {
  const [config, setConfig] = useState({
    viewType: "Week",
    headerDateFormat: "dddd dd",
  });
  const calendarRef = useRef();
  useEffect(
    () =>
      setConfig({
        ...config,
        events: events.map((event) => ({
          id: event.id,
          text: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime,
        })),
      }),
    [events]
  );

  return <DayPilotCalendar {...config} ref={calendarRef} />;
};

export default CalendarDayPilot;
