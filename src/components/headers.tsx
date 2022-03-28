import React from "react";
import uberLogo from "../images/uber-eats-logo.svg";

export const Header = () => (
  <header className=" py-1">
    <div className=" w-full max-w-screen-xl mx-auto">
      <img src={uberLogo} className="w-40 mb-5"></img>
      I'm the header
    </div>
  </header>
);
