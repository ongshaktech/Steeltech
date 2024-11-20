import React from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';

export default function ManageUsersHeading({setshowUserModal}) {
  return (
    <div className="mb-10">
    <h2 className="text-3xl font-bold ">Manage Users</h2>

    <div className="flex gap-4 justify-end items-center">
      <button
        className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center"
        onClick={() => {
            setshowUserModal(true);
        }}
      >
        Add User
        <CiCirclePlus className="w-6 h-6" />
      </button>
      {/* <button
        className="bg-red-500 px-4 py-2 rounded-full text-white flex gap-2 items-center"
        // onClick={() => setshowShiftModal(true)}
      >
        Remove User
        <IoMdTime className="w-6 h-6" />
      </button> */}
     
    </div>
  </div>
  )
}
