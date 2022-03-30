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
import { NotFound } from "../pages/404";
import { ConFirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";

const ClientRoutes = () => [
  <Route key={1} path="/" element={<Restaurants />}></Route>,
  <Route key={2} path="/confirm" element={<ConFirmEmail />}></Route>,
  <Route key={3} path="/edit-profile" element={<EditProfile />}></Route>,
  <Route key={4} path="/search" element={<Search />}></Route>,
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
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  );
};
