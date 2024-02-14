import { useEffect, useState, useCallback } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { debounce } from "lodash";
import "./cards.scss";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";
import FeedbackModal from "./FeedbackModal";
import userIcon from "../../assets/images/user.png";

export default function ListCard() {
  const [pastMeetings, setPastMeetings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedMeetingAttendees, setSelectedMeetingAttendees] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    fetchPastMeetings();
    // const getPastMeetings = async () => {};
    // getPastMeetings();
  }, [user]);

  const fetchPastMeetings = useCallback(
    debounce(async () => {
      setLoading(true);
      const currentDate = new Date();
      const oneWeekAgo = new Date(
        currentDate.getTime() - 17 * 24 * 60 * 60 * 1000
      );
      const threeHoursAgo = new Date(
        currentDate.getTime() - 1 * 60 * 60 * 1000
      );
      const params = {
        userEmail: user?.email,
        timeMin: oneWeekAgo.toISOString(),
        timeMax: threeHoursAgo.toISOString(),
        code: localStorage.getItem("googleCode"),
        type: "past eventssss",
      };
      const response = await GetGoogleCalendarEvents(params);
      if (response?.status) {
        setPastMeetings(response?.data?.data);
      }
      setLoading(false);
    }, 500),
    []
  );

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
                        {pastMeeting?.summary}
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
                  {pastMeeting.attendees.map((attendee) => (
                    <dd>
                      {!attendee?.organizer ? (
                        <img
                          className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                          src={userIcon}
                          alt={attendee?.email}
                        />
                      ) : (
                        ""
                      )}
                    </dd>
                  ))}
                </div>
                <div className="flex w-25 gap-x-2.5">
                  <button
                    type="button"
                    className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    onClick={() => {
                      setShowFeedbackModal(true);
                      setSelectedMeeting(pastMeeting);
                      setSelectedMeetingId(pastMeeting?.id);
                      setSelectedMeetingAttendees(pastMeeting.attendees);
                    }}
                  >
                    Give Feedback
                  </button>
                </div>
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
