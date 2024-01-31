import { saveFeedback } from "../../services/feedback.service";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function FeedbackModal({
  user,
  meetingId,
  attendees,
  showFeedbackModal,
  onClose,
}) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const onClick = (attendee) => {
    setShowFeedbackForm(true);
    setSelectedAttendee(attendee);
  };

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
                  style={{ width: "25%" }}
                >
                  {showFeedbackForm ? (
                    <FeedbackForm
                      user={user}
                      meetingId={meetingId}
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

function Attendees({ user, attendees, onClick }) {
  return (
    <>
      <div className="mb-2">
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
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter name"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {attendees.map((attendee) => (
          <>
            <div className="flex">
              <div className="px-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-col text-sm font-medium">
                <div>{attendee.name}</div>
                <div>{attendee.email}</div>
              </div>
            </div>
            <div className="w-25 gap-x-2.5 justify-self-end self-center">
              <button
                type="button"
                className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => onClick(attendee)}
                disabled={attendee.email == user.email}
              >
                {attendee.email == user.email ? "Self" : "Give Feedback"}
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

function FeedbackForm({ user, meetingId, attendee, onClose }) {
  const [feedback, setFeedback] = useState(null);
  return (
    <>
      <div className="flex">
        <div className="px-2">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="flex-auto">
          <div>{attendee.name}</div>
          <textarea
            rows={4}
            name="feedback"
            id="feedback"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          onClick={() => {
            saveFeedback({
              givenBy: user.email,
              givenTo: attendee.email,
              meetingId,
              feedback,
            });
            onClose();
          }}
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
    </>
  );
}
