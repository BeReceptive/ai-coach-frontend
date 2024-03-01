import {
  saveFeedback,
  getFeedbacksByQuery,
} from "../../services/feedback.service";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import "./feedback-modal.scss";
import userIcon from "../../assets/images/user.png";
import { getErrorMessage } from "../../utils/helpers";

export default function FeedbackModal({
  user,
  meetingId,
  meeting,
  attendees,
  showFeedbackModal,
  onClose,
}) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [existingFeedbacks, setExistingFeedbacks] = useState([]);
  const onClick = (attendee) => {
    setShowFeedbackForm(true);
    setSelectedAttendee(attendee);
  };
  useEffect(() => {
    if (showFeedbackModal) {
      const getFeedbacks = async () => {
        const feedbackParams = {
          meetingId,
        };
        const response = await getFeedbacksByQuery(feedbackParams);
        console.log("response2: ", response);
        setExistingFeedbacks(response.data);
      };
      getFeedbacks();
    }
  }, [showFeedbackModal]);

  return (
    <>
      <Transition.Root show={showFeedbackModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6"
                  style={{ width: "32%" }}
                >
                  {showFeedbackForm ? (
                    <FeedbackForm
                      user={user}
                      meetingId={meetingId}
                      meeting={meeting}
                      attendee={selectedAttendee}
                      onClose={() => {
                        setShowFeedbackForm(false);
                        onClose();
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export function Attendees({ user, attendees, feedbacks, meetingId, onClick }) {
  const [search, setSearch] = useState(null);
  return (
    <>
      <div className="mb-2 attendees">
        <h3 className={"sub-heading"}>Profile</h3>
        <p className={"des"}>This information will be displayed publicy</p>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <div className="mt-2">
          <input
            type="name"
            name="name"
            id="name"
            className="text-field block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="attendees-list flex flex-col gap-1">
        {attendees?.length &&
          attendees
            .filter(
              (attendee) =>
                search == null ||
                attendee?.email?.includes(search) ||
                attendee?.emailAddress?.name?.includes(search)
            )
            .map((attendee) => (
              <div
                className={"attendees-card flex align-center justify-between"}
              >
                <div className="flex items-center">
                  <div className="px-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={userIcon}
                      alt=""
                    />
                  </div>
                  <div className="flex-col text-sm font-medium">
                    <h3>{attendee?.name || attendee?.emailAddress?.name}</h3>
                    <p>{attendee?.email || attendee?.emailAddress?.address}</p>
                  </div>
                </div>
                <div className="w-25 gap-x-2.5 justify-self-end self-center">
                  <button
                    type="button"
                    className="theme-btn-round px-2 py-1 text-sm "
                    onClick={() => onClick(attendee)}
                    disabled={
                      attendee.email == user.email ||
                      feedbacks.filter(
                        (feedback) =>
                          feedback?.meeting?.meetingId == meetingId &&
                          feedback.givenBy == user.email &&
                          (feedback.givenTo == attendee.email ||
                            feedback.givenTo == attendee.emailAddress?.address)
                      ).length > 0
                    }
                  >
                    {attendee.email == user.email
                      ? "Self"
                      : feedbacks.filter(
                          (feedback) =>
                            feedback?.meeting?.meetingId == meetingId &&
                            feedback.givenBy == user.email &&
                            feedback.givenTo == attendee.email
                        ).length > 0
                      ? "Submitted"
                      : "Give Feedback"}
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export function FeedbackForm({ user, meetingId, meeting, attendee, onClose }) {
  const [feedback, setFeedback] = useState(null);

  const giveFeedback = async () => {
    const feedbackObj = {
      givenBy: user.email,
      givenTo: attendee?.email || attendee?.emailAddress?.address,
      meetingId,
      meetingStart: meeting?.start?.dateTime,
      meetingEnd: meeting?.end?.dateTime,
      meetingTimezone: meeting?.start?.timeZone,
      meetingStatus: meeting?.status || "confirmed",
      feedback,
    };
    try {
      const response = await saveFeedback(feedbackObj);
      if (response?.status) {
        toast.success("Feedback submitted successfully");
        onClose();
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
    }
  };

  return (
    <div className={"feedback-form"}>
      <div className="flex">
        <div className="px-2">
          <img className="h-10 w-10 rounded-full" src={userIcon} alt="" />
        </div>
        <div className="flex-auto">
          <div>{attendee?.email || attendee?.emailAddress?.address}</div>
          <textarea
            rows={14}
            name="feedback"
            id="feedback"
            className="text-field block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Give your feedback"
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={giveFeedback}
          // onClick={() => {
          //   saveFeedback({
          //     givenBy: user.email,
          //     givenTo: attendee.email,
          //     meetingId,
          //     feedback,
          //   });
          //   onClose();
          // }}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
