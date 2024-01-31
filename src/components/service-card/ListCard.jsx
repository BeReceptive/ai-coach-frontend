import { CalendarIcon } from "@heroicons/react/20/solid";
import "./cards.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";
import FeedbackModal from "./FeedbackModal"

// const discussions = [
//   {
//     id: 1,
//     summary: "Back End Developer in Engineering",
//     position: "in Engineering",
//     hangoutLink: "#",
//     date: "Closing on January 7, 2020",
//     end: {
//       dateTime: "2023-01-23T22:34Z",
//     },
//     status: "active",
//     attendees: [
//       {
//         id: 12,
//         name: "Emma Dorsey",
//         imageUrl:
//           "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       },
//     ],
//   },
//   {
//     id: 2,
//     summary: "Back End Developer in Engineering",
//     position: "in Engineering",
//     hangoutLink: "#",
//     date: "Closing on January 7, 2020",
//     end: {
//       dateTime: "2023-01-24T10:00:00Z",
//     },
//     dateTime: "2023-01-23T19:20Z",
//     status: "active",
//     attendees: [
//       {
//         id: 13,
//         email: "Alicia Bell",
//         imageUrl:
//           "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       },
//     ],
//   },
// ];

export default function ListCard() {
  const [pastMeetings, setPastMeetings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
  const getPastMeetings = async () => {
  const currentDate = new Date();
  const oneWeekAgo = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  const threeHoursAgo = new Date(
  currentDate.getTime() - 1 * 60 * 60 * 1000
  );
  const params = {
  userEmail: user?.email,
  timeMin: oneWeekAgo.toISOString(),
  timeMax: threeHoursAgo.toISOString(),
  };
  const response = await GetGoogleCalendarEvents(params);
  setPastMeetings(response?.data?.data);
  };
  getPastMeetings();
  }, [user]);

  return (
    <>
      {console.log("pastMeetings: ", pastMeetings)}
      {pastMeetings.length > 0 ? (
        <ul className="list-card divide-y divide-gray-100 my-5">
          {pastMeetings.map((discussion) => (
            <li
              key={discussion?.id}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap bg-white px-4 py-5 sm:px-6"
            >
              <div>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={discussion?.hangoutLink} className="hover:underline">
                    {/* {discussion.title}{" "} */}
                    <span className={"text-indigo-600"}>
                      {discussion?.summary}
                    </span>
                    {/* <span className={"text-indigo-600"}>{discussion.position}</span> */}
                  </a>
                </p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  {/* <p>
                     <a href={discussion?.author?.href} className="hover:underline">
                         {discussion.author.name}
                      </a>
                  </p> */}
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    <time dateTime={discussion?.end?.dateTime}>
                      {"Closing on January 7, 2020"}
                    </time>
                  </p>
                </div>
              </div>
              <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                <div className="flex -space-x-0.5">
                  <dt className="sr-only">Commenters</dt>
                  {discussion.attendees.map((attendee) => (
                    <dd>
                      {!attendee?.organizer ? (
                        <img
                          className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                          src={
                            "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
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
                      setSelectedMeetingId(discussion?.id);
                    }}>
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
      {showFeedbackModal && <FeedbackModal meetingId={selectedMeetingId} onClose={() => setShowFeedbackModal(false)} />}
    </>
  );
}
