import React from "react";
import ServiceCard from "../../components/service-card/ServiceCard";

export default function CoachInsights() {
  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="flex">
          <div className="flex-1">
            {/* <h3 className={"text-black text-2xl text-left mb-3"}>
              Coach Insights
            </h3> */}
            <ServiceCard isDashboard={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
