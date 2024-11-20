import React, { useEffect, useRef, useState } from "react";
import {
  ProductDimension,
  ProductThickness,
  ProductTypes,
} from "../../../data/constants";
import { doc, getDoc } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";

export default function ProductForm({ setFormData, setshowProductModal }) {
  let [machineNumList, setMachineNumList] = useState([]);
  let [msg, setMsg] = useState("");
  let [machine_no, setMachine_no] = useState("");
  let [thickness, setThickness] = useState("");
  let [product_type, setProduct_type] = useState("");
  let [dimension, setDimension] = useState("");
  // let shift = useRef('');

  const setData = (e) => {
    e.preventDefault();

    if (
      machine_no === "" ||
      thickness === "" ||
      product_type === "" ||
      dimension === ""
    ) {
      setMsg("Please fill up this form properly");
      return false;
    }

    setFormData({
      machine_no: machine_no,
      thickness: thickness,
      product_type: product_type,
      product_dimensions: dimension,
      // shift: shift.current.value
    });

    setshowProductModal(false);
  };

  useEffect(() => {
    const ref = doc(db_firestore, `information`, "info");

    getDoc(ref).then((data) => {
      let numList = [];
      const list = data.data();

      list["forming_machine"].forEach((num, index) => {
        numList.push(num);
      });

      setMachineNumList(numList);
    });
  }, []);

  return (
    <form className="flex flex-col gap-8" onSubmit={setData}>
      <h2 className="text-2xl font-bold pb-6">Add Product</h2>
      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Machine No*</p>

        <select
          value={machine_no}
          onChange={(e) => setMachine_no(e.target.value)}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Machine No.
          </option>
          {machineNumList?.map((machine) => (
            <option value={machine}>{machine}</option>
          ))}
        </select>
      </label>

      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Dimension*</p>
        <select
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
        >
          <option selected disabled value="">
            Dimension
          </option>
          {ProductDimension.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Thickness*</p>
        <select
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
        >
          <option selected disabled value="">
            Product Thickness
          </option>
          {ProductThickness.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Product Type*</p>
        <select
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={product_type}
          onChange={(e) => setProduct_type(e.target.value)}
        >
          <option selected disabled value="">
            Product Type
          </option>
          {ProductTypes.map((type) => (
            <option value={type}>{type}</option>
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
