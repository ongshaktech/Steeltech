import React from "react";

export default function ManageUserTable({ userdata }) {
  return (
    <div class="relative overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary text-white font-light rounded-lg">
          <tr className=" rounded-tl-lg">
            <th className="border border-black p-2">ID.</th>
            <th className="border border-black p-2"> Name</th>
            <th className="border border-black p-2">User Name</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Access</th>
          </tr>
        </thead>

        <tbody>
          {/* <tr> */}
          {userdata?.map((item, id) => (
            <tr>
              <td class="border border-black p-4">{id + 1}</td>
              <td class="border border-black p-4">{item.name}</td>
              <td class="border border-black p-4">{item.username}</td>
              <td class="border border-black p-4">{item.email}</td>
              <td class="border border-black p-4">{item.access}</td>
            </tr>
          ))}
          {/* <td className="border border-gray-500 text-center py-4 " colSpan="13">
          Plase Select a Date Range
        </td> */}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
}
