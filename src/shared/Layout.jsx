import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Triangle } from "react-loader-spinner";
import { AuthLogin } from "../Hooks/firebaseFuncs";
import Signin from "../pages/Singin/Signin";
import { GetCookie } from "../Authentication/Cookies";

export default function Layout() {
  let [isUser, setUser] = useState("unknown");
  let [authview, setAuthview] = useState(<></>);

  useEffect(() => {
    // Get encrypted Login Credentials from Cookies and Validate with FireStore
    AuthLogin("users", GetCookie("email"), GetCookie("pswd")).then(
      (response) => {
        if (response[0]) {
          setUser("is_user");
          console.log("response[0]", response)
        }
        else setUser("not_user");
      }
    );
  }, []);

  useEffect(() => {
    // Loading Wheel
    if (isUser === "unknown")
      setAuthview(
        <div className="min-h-screen flex justify-center items-center">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            visible={true}
          />
        </div>
      );
    else if (isUser === "not_user") setAuthview(<Signin />);
  }, [isUser]);

  console.log("isUser", isUser);

  return isUser !== "is_user" ? (
    <>{authview}</>
  ) : (
    <div className="flex gap-6 flex-col md:flex-row">
      <Sidebar />
      <div className="container mx-auto w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
