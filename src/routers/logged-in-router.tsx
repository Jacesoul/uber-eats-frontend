import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/headers";
import { useMe } from "../hooks/useMe";

const ClientRoutes = () => [
  <Route path="/" element={<Restaurants></Restaurants>}></Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header email={data.me.email}></Header>
      <Routes>
        {data.me.role === "Client" && ClientRoutes()}
        <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
      </Routes>
    </Router>
  );
};
