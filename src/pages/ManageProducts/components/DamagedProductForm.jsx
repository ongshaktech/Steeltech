import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db_firestore } from "../../../Hooks/config";
import { Shifts } from "../../../data/constants";

export default function DamagedProductForm({
  setFormData,
  setshowProductModal,
}) {
  let [machineNumList, setMachineNumList] = useState([]);
  let [confirm, setConfirm] = useState(false);
  let [msg, setMsg] = useState("");
  let [lastestProduct, setLatestProduct] = useState({
    machine_no: "",
    thickness: "N/A",
    product_type: "N/A",
    product_dimensions: "N/A",
    shift: "",
  });

  let machine_no = useRef("");
  let damage_count = useRef("");
  let shift = useRef("");

  // get latest product info
  const selectMachine = (number) => {
    const ref = doc(db_firestore, `latest_product`, `machine_${number}`);
    getDoc(ref).then((data) => {
      setLatestProduct(data.data());
    });
  };

  const validation = () => {
    if (
      machine_no.current.value === "" ||
      shift.current.value === "" ||
      damage_count.current.value === ""
    ) {
      setMsg("Please fill up this form properly");
      return false;
    }
    return true;
  };

  const setData = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    setFormData({
      damagedProductCount: parseInt(damage_count.current.value),
      machine_no: machine_no.current.value,
      product_dimensions: lastestProduct.product_dimensions,
      product_type: lastestProduct.product_type,
      shift: shift.current.value,
      thickness: lastestProduct.thickness,
      unix_time: Math.floor(Date.now() / 1000),
    });
    setshowProductModal(false);
    setConfirm(false);
  };

  useEffect(() => {
    const ref = doc(db_firestore, `information`, "info");

    getDoc(ref).then((data) => {
      let numList = [];
      const list = data.data();

      numList.push(<optgroup label="Forming Machines"></optgroup>);
      list["forming_machine"].forEach((num, index) => {
        numList.push(
          <option key={index} value={num}>
            {num}
          </option>
        );
      });

      numList.push(<optgroup label="Polish Machines"></optgroup>);
      list["polish_machine"].forEach((num, index) => {
        numList.push(
          <option key={index + numList.length} value={num}>
            {num}
          </option>
        );
      });

      setMachineNumList(numList);
    });
  }, []);
  return (
    <form className={`flex flex-col gap-4 ${!confirm ? `#ddd` : ""}`} onSubmit={setData}>
      <h2 className="text-2xl font-bold pb-6">Add Product</h2>
      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Machine No*</p>

        <select
          ref={machine_no}
          onChange={(e) => {
            selectMachine(e.target.value);
          }}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Machine No.
          </option>
          {machineNumList}
        </select>
      </label>

      <label
        className="flex gap-6 items-center"
        style={{
          paddingBottom: "10px",
          borderBottom: "1px solid #000",
        }}
      >
        <p className="w-[180px]">Dimension:</p>
        {lastestProduct.product_dimensions}
      </label>

      <label
        className="flex gap-6 items-center"
        style={{
          paddingBottom: "10px",
          borderBottom: "1px solid #000",
        }}
      >
        <p className="w-[180px]">Thickness:</p>
        {lastestProduct.thickness}
      </label>

      <label
        className="flex gap-6 items-center"
        style={{
          paddingBottom: "10px",
          borderBottom: "1px solid #000",
        }}
      >
        <p className="w-[180px]">Product Type:</p>
        {lastestProduct.product_type}
      </label>

      <label
        className="flex gap-6 items-center"
        style={{
          marginBottom: "0px",
        }}
      >
        <p className="w-[180px]">Shift*</p>
        <select
          ref={shift}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Select Shift
          </option>
          {Shifts.map((shift) => (
            <option value={shift}>{shift}</option>
          ))}
        </select>
      </label>

      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Count*</p>
        <input
          ref={damage_count}
          type="number"
          min="1"
          required
          placeholder="Damaged Product Count"
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        />
      </label>

      <div className="flex justify-center">
        {confirm ? (
          <button className="btn-primary " type="submit">
            Submit
          </button>
        ) : (
          <input
            value={"Review"}
            type="button"
            className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
            onClick={() => {
              if (validation()) {
                setConfirm(true);
                setMsg("Please Review the form before submitting");
              }
            }}
          />
        )}
      </div>

      <span className="msgSpan">{msg}</span>
    </form>
  );
}
