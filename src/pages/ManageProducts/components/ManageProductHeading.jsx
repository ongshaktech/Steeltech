import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GiDamagedHouse, GiVendingMachine } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ManageProductHeading({
  setshowProductModal,
  setshowShiftModal,
  setdamagedProductModal,
}) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold ">Manage Products</h2>

      <div className="flex gap-4 justify-end items-center">
        <Link to="/products/add-product">
          <button
            className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center"
            //   onClick={() => {
            //     setshowProductModal(true);
            //   }}
          >
            Add Product
            <CiCirclePlus className="w-6 h-6" />
          </button>
        </Link>
        {/* <button
          className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center"
          onClick={() => setshowShiftModal(true)}
        >
          Choose Shift
          <IoMdTime className="w-6 h-6" />
        </button>
        <button
          className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center"
          onClick={() => setdamagedProductModal(true)}
        >
          Add Damanged Product
          <GiDamagedHouse className="w-6 h-6" />
        </button>
        <button className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center">
          Manage Machines
          <GiVendingMachine className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
}
