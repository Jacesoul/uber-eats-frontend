import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import uberLogo from "../images/uber-eats-logo.svg";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => (
  <header className=" py-1">
    <div className=" w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
      <img src={uberLogo} className="w-24" alt="Uber Eats"></img>
      <span className=" text-xs">
        <Link to="/my-profile">
          <FontAwesomeIcon icon={faUser} className=" text-xl" />
        </Link>
      </span>
    </div>
  </header>
);
