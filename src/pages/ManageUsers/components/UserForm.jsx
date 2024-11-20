import React, { useRef, useState } from "react";
import { userTypes } from "../../../data/constants";

export default function UserForm({ setFormData, setshowUserModal }) {
  let username = useRef("");
  let name = useRef("");
  let password = useRef("");
  let email = useRef("");
  let access = useRef("");
  let [msg, setMsg] = useState("");

  const setData = (e) => {
    e.preventDefault();

    if (
      username.current.value === "" ||
      name.current.value === "" ||
      password.current.value === "" ||
      email.current.value === ""
    ) {
      setMsg("Please fill up this form properly");
      return false;
    }

    setFormData({
      username: username.current.value,
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      access: access.current.value,
    });

    setshowUserModal(false);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={setData}>
      <h2 className="text-2xl font-bold pb-6">Add Product</h2>

         <label className="flex gap-6 items-center">
         <p className="w-[180px]">User Name*</p>
        <input type="text" ref={username}   className="w-full p-2 rounded-md border border-black outline-none focus:outline-none" />
      </label>
         <label className="flex gap-6 items-center">
         <p className="w-[180px]">Name*</p>
        <input type="text" ref={name}   className="w-full p-2 rounded-md border border-black outline-none focus:outline-none" />
      </label>
         <label className="flex gap-6 items-center">
         <p className="w-[180px]">Password*</p>
        <input type="password" ref={password}    className="w-full p-2 rounded-md border border-black outline-none focus:outline-none" />
      </label>
         <label className="flex gap-6 items-center">
         <p className="w-[180px]">Email*</p>
        <input type="email" ref={email}   className="w-full p-2 rounded-md border border-black outline-none focus:outline-none" />
      </label>
         <label className="flex gap-6 items-center">
         <p className="w-[180px]">Access*</p>
        <select ref={access}   className="w-full p-2 rounded-md border border-black outline-none focus:outline-none">
          {userTypes.map((user) => (
            <option value={user}>{user}</option>
          ))}
        </select>
      </label>

      <div className="flex justify-center">
        <button className="btn-primary " type="submit">
          Submit
        </button>
      </div>

      <span className="msgSpan">{msg}</span>
    </form>
  );
}
