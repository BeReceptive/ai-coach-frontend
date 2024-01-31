import { useState } from "react";

export default function FeedbackModal( {meetingId, onClose} ) {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedAttendeeEmail, setSelectedAttendeeEmail] = useState(null);
    const onClick = (attendeeEmail) => {
        setShowFeedbackForm(true);
        setSelectedAttendeeEmail(attendeeEmail);
    }

    return (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {showFeedbackForm ? <FeedbackForm attendeeEmail={selectedAttendeeEmail} onClose={onClose} /> : <Attendees attendees={[{name: "Attendee Name", email: "test@gmail.com"}]} onClick={(attendeeId) => onClick(attendeeId)} onClose={onClose} />
                }
            </div>
            </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

function Attendees( {attendees, onClick, onClose} ) {
    return (
        <>
           {/*header*/}
           <div className="flex items-end justify-end px-2 py-1 rounded-t">
                  <button
                    className="bg-transparent border-0 text-gray-900 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
           <div className="flex-col p-5 rounded-t">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                        Search
                    </label>
                </div>
                <div>
                    <input
                    type="search"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter name"
                    />
                </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex font-medium gap-10 text-gray-900 text-sm">
                {attendees.map(attendee => (
                    <>
                    <div className="flex-col flex-2 content-start">
                    <div>
                        {attendee.name}
                    </div>
                    <div>
                        {attendee.email}
                    </div>
                </div>
                <div className="flex-1 w-25 gap-x-2.5">
                    <button
                        type="button"
                        className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                        onClick={() => onClick(attendee.email)}
                    >
                        Give Feedback
                    </button>
                    </div></>
                ))}    
            </div>
        </>
    );
}

function FeedbackForm( {attendeeEmail, onClose} ) {
    console.log(attendeeEmail)
    return (
        <>
        <div className="flex items-end justify-end px-2 py-1 rounded-t">
                  <button
                    className="bg-transparent border-0 text-gray-900 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-gray-900 h-6 w-6 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
            {/*body*/}
            <div className="relative p-6 flex font-medium text-gray-900 text-sm">
            <textarea
                rows={4}
                name="feedback"
                id="feedback"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
            />  
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                className="bg-white text-gray-500 background-transparent font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
                >
                Cancel
                </button>
                <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => console.log("submitted")}
                >
                Submit
                </button>
            </div>
        </>
    );
}