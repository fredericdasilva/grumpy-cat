import React from "react";
import { Theme as DarkToggle } from "../Theme";
import { logo, arrow_left } from "../asset-icons";
import { Link } from "react-router-dom";

export const NavSub = ({ history }) => {
  return (
    <>
      <div className="flex-space-between-row p-md fixed-top nav-bg">
        <button>{arrow_left}</button>
        <Link
          className="color-gray-400 logo"
          to={{ pathname: "/", state: { fromDashboard: true } }}
        >
          {" "}
          {logo}
        </Link>
        <DarkToggle />
      </div>
    </>
  );
};
