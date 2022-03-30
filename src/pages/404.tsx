import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className=" h-screen  flex flex-col justify-center items-center">
    <Helmet>
      <title>Not Found | Uber Eats</title>
    </Helmet>
    <h2 className=" font-semibold text-2xl mb-3">Page Not Found</h2>
    <h4 className=" font-medium text-base mb-5">
      The page You're looking for does not exist or has moved.
    </h4>
    <Link className=" hover:underline text-emerald-600" to="/">
      Go back Home &rarr;
    </Link>
  </div>
);
