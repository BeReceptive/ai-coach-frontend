import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeBracketIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { getFeedbacksByQuery } from "../../services/feedback.service";
import moment from "moment";
import userIcon from "../../assets/images/user.png";
import { getCoachInsightsByQuery } from "../../services/coachInsight.service";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ServiceCard() {
  const { user } = useAuth0();
  const [feedbacks, setFeedbacks] = useState([]);
  const [coachInsights, setCoachInsights] = useState([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      const coachInsightParams = {
        givenTo: user?.email,
      };
      const response = await getFeedbacksByQuery(coachInsightParams);
      const res2 = await getCoachInsightsByQuery(coachInsightParams);
      console.log("response2: ", res2);
      setCoachInsights(res2?.data);
      setFeedbacks(response?.data);
    };
    getFeedbacks();
  }, []);

  const formatDate = (originalDateString) => {
    const date = new Date(originalDateString);
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  return (
    <>
      {coachInsights.length > 0 ? (
        <>
          <h3 className={"text-black text-2xl text-left mb-3"}>
            Coach Insights
          </h3>
          {coachInsights.map((coachInsight) => (
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-10 w-10 rounded-full"
                    // src="https://lh3.googleusercontent.com/a/ACg8ocJ3rX6wLtgIMoFewITVTi8dIJE58Hp0_gFsH9Q7r2nY=s96-c"
                    src={coachInsight?.givenByUser?.imageUrl || userIcon} //"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 text-left">
                    {/* <a href="#" className="hover:underline">
                      {coachInsight?.givenByUser?.name || coachInsight?.givenBy}
                    </a> */}
                  </p>
                  <p className="text-sm text-gray-500 text-left">
                    <a href="#" className="hover:underline">
                      {formatDate(coachInsight?.createdAt)}
                    </a>
                  </p>
                </div>
                <div className="flex flex-shrink-0 self-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    {/* <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <StarIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Add to favorites</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <CodeBracketIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Embed</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <FlagIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Report content</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition> */}
                  </Menu>
                </div>
              </div>
              <div>
                <p className={"text-gray-400 text-base text-left mt-3"}>
                  {coachInsight?.gptFeedbackSummary || ""}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
