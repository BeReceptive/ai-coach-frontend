import { useEffect, useState, useCallback } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { debounce } from "lodash";
import "./cards.scss";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";
import FeedbackModal from "./FeedbackModal";
import userIcon from "../../assets/images/user.png";
import { getTimeRangeForPastMeetings } from "../../utils/helpers";
import { GetMicrosoftCalendarEvents } from "../../services/microsoftCalendar.service";
import { validateMeetingFeedback } from "../../services/feedback.service";
import { toast } from "react-toastify";

export default function ListCard() {
  const [pastMeetings, setPastMeetings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [selectedMeetingAttendees, setSelectedMeetingAttendees] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    fetchPastMeetings();
  }, [user, shouldUpdate]);

  const fetchPastMeetings = useCallback(
    debounce(async () => {
      setLoading(true);
      const { timeMin, timeMax } = getTimeRangeForPastMeetings();
      const params = {
        userEmail: user?.email,
        timeMin: timeMin,
        timeMax: timeMax,
        code: localStorage.getItem("googleCode"),
        type: "past events",
      };
      if (user?.sub?.includes("google-oauth2")) {
        if (localStorage.getItem("googleCode"))
          params.code = localStorage.getItem("googleCode");
        const response = await GetGoogleCalendarEvents(params);
        if (response?.status) {
          const currentTime = new Date();
          const timezoneOffset = -currentTime.getTimezoneOffset() / 60; // Get timezone offset in hours
          const formattedTime = `${currentTime.getFullYear()}-${String(
            currentTime.getMonth() + 1
          ).padStart(2, "0")}-${String(currentTime.getDate()).padStart(
            2,
            "0"
          )}T${String(currentTime.getHours()).padStart(2, "0")}:${String(
            currentTime.getMinutes()
          ).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(
            2,
            "0"
          )}+${String(timezoneOffset).padStart(2, "0")}:00`;
          const filteredMeetings = response?.data?.data.filter((meeting) => {
            return formattedTime > meeting?.end?.dateTime;
          });
          setPastMeetings(filteredMeetings);
        }
      } else if (user?.sub?.includes("windowslive") || user?.sub?.includes("waad")) {
        if (localStorage.getItem("microsoftToken"))
          params.accessToken = JSON.parse(
            localStorage.getItem("microsoftToken")
          );
        if(localStorage.getItem("microsoftCode"))
          params.code = localStorage.getItem("microsoftCode");
        console.log("paramsss: ", params);
        const response = await GetMicrosoftCalendarEvents(params);
        if (response?.status) {
          setPastMeetings(response?.data?.data);
        }
      }
      setLoading(false);
    }, 500),
    []
  );

  const handleFeedbackSubmit = async (pastMeeting) => {
    const response = await validateMeetingFeedback(pastMeeting);
    if (response?.status) {
      setShowFeedbackModal(true);
      setSelectedMeeting(pastMeeting);
      if (pastMeeting?.iCalUId !== undefined) {
        setSelectedMeetingId(pastMeeting?.iCalUId);
      } else {
        setSelectedMeetingId(pastMeeting?.id);
      }
      setSelectedMeetingAttendees(pastMeeting?.attendees);
      return;
    }
    setShouldUpdate(!shouldUpdate);
    toast.error(response?.message || "Feedback can not be submitted.");
    return;
  };

  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.toLocaleDateString("default", { day: "numeric" });
  const year = today.getFullYear();

  return (
    <>
      {pastMeetings.length > 0 ? (
        <ul className="list-card divide-y divide-gray-100 my-5">
          {pastMeetings.map((pastMeeting) => (
            <li
              key={pastMeeting?.id}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap bg-white px-4 py-5 sm:px-6"
            >
              <div>
                <div className="flex px-0.5">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a
                      // href={pastMeeting?.hangoutLink}
                      className="hover:underline"
                    >
                      {/* {pastMeeting.title}{" "} */}
                      <span className={"text-indigo-600"}>
                        {pastMeeting?.summary || pastMeeting?.subject}
                      </span>
                      {/* <span className={"text-indigo-600"}>{pastMeeting.position}</span> */}
                    </a>
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  {/* <p>
                     <a href={pastMeeting?.author?.href} className="hover:underline">
                         {pastMeeting.author.name}
                      </a>
                  </p> */}
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    <time dateTime={pastMeeting?.end?.dateTime}>
                      {`Closing on ${month} ${day}, ${year}`}
                    </time>
                  </p>
                </div>
              </div>
              <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                <div className="flex -space-x-0.5">
                  <dt className="sr-only">Commenters</dt>
                  {pastMeeting?.attendees?.map((attendee) => (
                    <dd>
                      {!attendee?.organizer ? (
                        <img
                          className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                          src={userIcon}
                          alt={
                            attendee?.email || attendee?.emailAddress?.address
                          }
                        />
                      ) : (
                        ""
                      )}
                    </dd>
                  ))}
                </div>
                {pastMeeting?.attendees?.length > 0 ? (
                  <div className="flex w-25 gap-x-2.5">
                    <button
                      type="button"
                      className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                      onClick={() => handleFeedbackSubmit(pastMeeting)}
                    >
                      Give Feedback
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </dl>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      <FeedbackModal
        meetingId={selectedMeetingId}
        meeting={selectedMeeting}
        attendees={selectedMeetingAttendees}
        showFeedbackModal={showFeedbackModal}
        user={user}
        onClose={() => setShowFeedbackModal(false)}
      />
    </>
  );
}
