import React from "react";
import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/headers";

const ClientRoutes = () => [
  <Route path="/" element={<Restaurants></Restaurants>}></Route>,
];
const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header></Header>
      <Routes>
        {data.me.role === "Client" && ClientRoutes()}
        <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
      </Routes>
    </Router>
  );
};
