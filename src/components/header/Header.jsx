import React, { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SignoutButton from "./SignoutButton";
import { GetGoogleCalendarEvents } from "../../services/googleCalendar.service";
import { saveUser } from "../../services/user.service";
import LogoIcon from "../../assets/icons/defaultIcons";
import logoText from "../../assets/images/AI-Clarity.png";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// http://localhost:8000/api/google-calendar/redirect
export default function Header() {
  const { user } = useAuth0();

  useEffect(() => {
    // save user to db
    const saveUserToDB = async () => {
      const savedUser = {
        name: user?.name,
        email: user?.email,
        imageUrl: user?.picture,
      };
      if (user) {
        const res = await saveUser(savedUser);
        console.log("res: ", res, user);
      }
    };
    saveUserToDB();
  }, [user]);

  const handleIntegrationWithGoogleCalendar = async () => {
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID, //your client id created in cloud console,
      scope: SCOPES,
      ux_mode: "popup",
      callback: async (response) => {
        try {
          if (!response.code) {
            return;
          }

          console.log("reponseeee: ", response, response.code);
          const params = {
            code: response?.code,
            userEmail: user?.email
          };

          const res = await GetGoogleCalendarEvents(params);
          console.log("responseeee: ", res);

          //sending the code to backend nodejs express
          // fetch("/storerefresktoken", {
          //   method: "post",
          //   headers: { "Content-Type": "application/json" },
          //   body: {
          //     code: response.code,
          //   },
          // })
          //   .then((response) => response.json())
          //   .then((data) => console.log("success"));
        } catch (error) {
          console.log(error);
        }
      },
    });
    client.requestCode();
  };
  return (
    <div className={"top-bar"}>
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border-solid border-b border-gray-50 border-opacity-15 py-2">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex gap-2 2xl:h-90">
                    <LogoIcon />
                    <img src={logoText} className={""} height={90} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          <SignoutButton />
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-12">
              <div className="mt-2 flex items-center text-md text-white font-semibold">
                Dashboard
              </div>
              <div className="mt-2 flex items-center text-md text-white font-semibold">
                Meetings
              </div>
              <div className="mt-2 flex items-center text-md text-white font-semibold">
                Coach Insights
              </div>
              <div
                onClick={handleIntegrationWithGoogleCalendar}
                className="mt-2 flex items-center text-md text-white font-semibold"
              >
                Integrate with Google Calendar
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
