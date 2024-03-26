import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./Calendar"
import { format } from "date-fns";
import moment from "moment-timezone";

const CalendarDayPilot = ({ events }) => {
  const [config, setConfig] = useState({
    viewType: "Week",
    headerDateFormat: "dddd dd",
  });
  const calendarRef = useRef();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(
    () =>
      setConfig({
        ...config,
        events: events.map((event) => ({
          id: event.id,
          text: event?.summary || event?.subject,
          start: moment.utc(event?.start?.dateTime).clone().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),//event?.start?.dateTime,
          end: moment.utc(event?.end?.dateTime).clone().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),//event?.end?.dateTime,
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
