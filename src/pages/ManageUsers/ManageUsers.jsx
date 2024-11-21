import React, { useState } from "react";
import ManageUsersHeading from "./components/ManageUsersHeading";
import ManageUserDetails from "./components/ManageUserDetails";

export default function ManageUsers() {
  let [showUserModal, setshowUserModal] = useState(false);
  return <div>
    <ManageUsersHeading setshowUserModal={setshowUserModal}  />
    <ManageUserDetails  showUserModal={showUserModal} setshowUserModal={setshowUserModal} />
  </div>
}
