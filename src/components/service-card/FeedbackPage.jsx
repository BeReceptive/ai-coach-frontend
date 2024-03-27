import {
  saveFeedback,
  getFeedbacksByQuery,
} from "../../services/feedback.service";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./feedback-modal.scss";
import { Attendees, FeedbackForm } from "./FeedbackModal";

export default function FeedbackPage() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [existingFeedbacks, setExistingFeedbacks] = useState([]);
  const [meetingId, setMeetingId] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [isFeedbackCycleExpired, setIsFeedbackCycleExpired] = useState(false);
  const [user, setUser] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [isTokenDecoded, setIsTokenDecoded] = useState(false);

  // get token from query params
  const token = new URLSearchParams(window.location.search).get("token");
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expiryTimestampMilliseconds = decodedToken?.exp * 1000;
      const currentTimestampMilliseconds = new Date().getTime();
      const isExpired = currentTimestampMilliseconds > expiryTimestampMilliseconds;
      setIsFeedbackCycleExpired(isExpired);
      const user = {
        email: decodedToken?.email,
      };
      const meetingId = decodedToken?.meetingId;
      const attendees = decodedToken?.meeting?.attendees;
      const meeting = decodedToken?.meeting;
      setMeeting(meeting);
      setUser(user);
      setMeetingId(meetingId);
      setAttendees(attendees);
      setIsTokenDecoded(true);
    }
  }, [token]);

  useEffect(() => {
    const getFeedbacks = async () => {
      const feedbackParams = {
        meetingId,
      };
      const response = await getFeedbacksByQuery(feedbackParams);
      setExistingFeedbacks(response.data);
    };
    getFeedbacks();
  }, [showFeedbackForm]);

  const onClick = (attendee) => {
    setShowFeedbackForm(true);
    setSelectedAttendee(attendee);
  };

  if(isFeedbackCycleExpired) {
    return (
      <div className="w-screen">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full">
            <div className="text-center">
              <h1 className="text-2xl text-red-500">Feedback cycle has expired</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isTokenDecoded && (
        <div className="w-screen">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full">
              {showFeedbackForm ? (
                <FeedbackForm
                  user={user}
                  meetingId={meetingId}
                  meeting={meeting}
                  attendee={selectedAttendee}
                  // attendee={user}
                  onClose={() => {
                    setShowFeedbackForm(false);
                  }}
                />
              ) : (
                <Attendees
                  attendees={attendees}
                  user={user}
                  feedbacks={existingFeedbacks}
                  meetingId={meetingId}
                  meeting={meeting}
                  onClick={onClick}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
