import {
  saveFeedback,
  getFeedbacksByQuery,
} from "../../services/feedback.service";
import { useState } from "react";
import "./feedback-modal.scss";
import { Attendees, FeedbackForm } from "./FeedbackModal";

export default function FeedbackPage() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [existingFeedbacks, setExistingFeedbacks] = useState([]);
  const onClick = (attendee) => {
    setShowFeedbackForm(true);
    setSelectedAttendee(attendee);
  };
  //   useEffect(() => {
  //     if (showFeedbackModal) {
  //       const getFeedbacks = async () => {
  //         const feedbackParams = {
  //           meetingId,
  //         };
  //         const response = await getFeedbacksByQuery(feedbackParams);
  //         console.log("response2: ", response);
  //         setExistingFeedbacks(response.data);
  //       };
  //       getFeedbacks();
  //     }
  //   }, [showFeedbackModal]);

  return (
    <>
      <div className="w-screen">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full">
            {showFeedbackForm ? (
              <FeedbackForm
                user={{ email: "user.email@gmail.com" }}
                meetingId={"meeting-id"}
                meeting={{
                  start: { dateTime: "2020-01-01", timeZone: "timezone" },
                  end: { dateTime: "2020-01-01" },
                  status: "Meeting Status",
                }}
                attendee={{ name: "Attendee Name", email: "Attendee Email" }}
                onClose={() => {
                  setShowFeedbackForm(false);
                }}
              />
            ) : (
              <Attendees
                attendees={[{ name: "Attendee Name", email: "Attendee Email" }]}
                user={{ email: "user.email@gmail.com" }}
                feedbacks={[]}
                meetingId={"meeting-id"}
                meeting={{
                  start: { dateTime: "2020-01-01", timeZone: "timezone" },
                  end: { dateTime: "2020-01-01" },
                  status: "Meeting Status",
                }}
                onClick={onClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
