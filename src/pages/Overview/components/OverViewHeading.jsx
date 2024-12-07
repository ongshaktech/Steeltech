import { useEffect, useState } from "react";
import rafi_professional from "../../../assets/images/avatar.jpg";
import { AuthLogin } from "../../../Hooks/firebaseFuncs";
import { GetCookie } from "../../../Authentication/Cookies";

export default function OverViewHeading() {
  let [user, setUser] = useState({});

  useEffect(() => {
    // Get encrypted Login Credentials from Cookies and Validate with FireStore
    AuthLogin("users", GetCookie("email"), GetCookie("pswd")).then(
      (response) => {
        if (response[0]) {
          setUser(response[1][0]);
          console.log("response[0]", response[1][0]);
        } else setUser("not_user");
      }
    );
  }, []);

  console.log("user", user);
  return (
    <div className="flex gap-4 justify-between items-center">
      <h2 className="text-xl">
        Welcome Back, <span className="text-primary">{user?.username} !</span>
      </h2>
      <div className=" flex gap-4 items-center">
        <img
          src={rafi_professional}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <p>{user?.username}</p>
      </div>
    </div>
  );
}
