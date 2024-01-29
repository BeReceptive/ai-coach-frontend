import React from "react";

import ShortCalendar from "../../components/calendar/ShortCalendar";
import ServiceCard from "../../components/service-card/ServiceCard";
import ListCard from "../../components/service-card/ListCard";
import CalendarS from "../../components/calendar/CalendarS";

export default function DashboardView() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-8/12">
            <CalendarS />
          </div>

          <div className="w-4/12">
            <ShortCalendar />
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
