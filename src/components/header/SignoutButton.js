import React from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";

function SignoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    localStorage.clear();
    logout({
      returnTo: window.location.origin + "/dashboard",
    });
  };

  return (
    isAuthenticated && (
      <Menu.Item key={"Sign Out"}>
        {({ active }) => (
          <Link
            onClick={handleLogout}
            to="/dashboard"
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            {"Sign out"}
          </Link>
        )}
      </Menu.Item>
    )
  );
}

export default SignoutButton;
