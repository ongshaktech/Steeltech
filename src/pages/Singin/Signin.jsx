import { SetCookie } from "../../Authentication/Cookies";
import { AuthLogin } from "../../Hooks/firebaseFuncs";
import { useState } from "react";

import Steeltech_Logo from "../../assets/images/Steeltech_Logo.svg";

const Signin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");

  const doAuth = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMsg("Can't login with empty credentials!");
      return;
    }

    AuthLogin("users", email, password).then((response) => {
      if (response[0]) {
        SetCookie("email", email, 30);
        SetCookie("pswd", password, 30);
        window.location.reload();
      } else setMsg("Wrong Credentials!");
    });
  };

  return (
    <div className="max-w-[500px] mx-auto min-h-screen p-20 flex justify-center items-center">
      <form className="w-full">
        {/* <h1 className="loginHeader">
        Steeltech Admin <br /> Login
      </h1> */}
        <div className=" pb-10">
          <img src={Steeltech_Logo} alt="" className="w-[250px] mx-auto" />
        </div>
        <div className="loginDivCont">
          <div className="flex flex-col gap-2">
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="Your Email"
              className="p-2 rounded-full bg-gray-200 outline-none focus:outline-none border border-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              placeholder="Your Password"
              type="password"
              className="p-2 rounded-full bg-gray-200 outline-none focus:outline-none border border-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button className="btn-primary mx-auto" onClick={doAuth}>
            LOG IN
          </button>
          <p className="loginMsg">{msg}</p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
