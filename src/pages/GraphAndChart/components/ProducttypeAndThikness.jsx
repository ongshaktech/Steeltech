import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db_firestore } from "../../../Hooks/config";
import { ProductThickness, ProductTypes } from "../../../data/constants";
import { ProductThicknessGraph } from "./ProductThiknessGraph";

export default function ProducttypeAndThikness() {
  const collection_name = "machinesIndividual";
  const currentYear = parseInt(new Date().getFullYear());
  let thicknessInput = useRef("");
  let machineNoInput = useRef("");
  let [date, setDate] = useState(new Date());

  let [year, setYear] = useState(currentYear);
  let [graphData, setGraphData] = useState([]);
  let [machineNumList, setMachineNumList] = useState([]);
  let [ProductData, setProductData] = useState({});
  let [status, setStatus] = useState("Select Product Thickness");
  let [machine, setMachine] = useState("Machine and Product is not selected");
  let [msg, setMsg] = useState("");

  // set todays date to input initially & Get Machine No.
  useEffect(() => {
    const ref = doc(db_firestore, `information`, "info");

    getDoc(ref).then((data) => {
      let numList = [];
      const list = data.data();

      numList.push(<optgroup label="Forming Machines"></optgroup>);
      list["forming_machine"].forEach((num, index) => {
        numList.push(
          <option key={index} defaultValue={num}>
            {num}
          </option>
        );
      });

      numList.push(<optgroup label="Polish Machines"></optgroup>);
      list["polish_machine"].forEach((num, index) => {
        numList.push(
          <option key={index + numList.length} defaultValue={num}>
            {num}
          </option>
        );
      });

      setMachineNumList(numList);
    });
  }, []);

  // Query in firestore DB and plot data on graph
  const putGraphData = (startDate, endDate) => {
    let graphDataArr = [];

    ProductTypes.map((product_type, index) => {
      const ref = collection(db_firestore, collection_name);
      const q = query(
        ref,
        where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
        where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
        where("machine_no", "==", ProductData.machineNo),
        where("thickness", "==", ProductData.thickness),
        where("product_type", "==", product_type)
      );
      getDocs(q).then((snapShot) => {
        let count = 0;
        let Weight = 0;

        snapShot.forEach((doc) => {
          if (parseFloat(doc.data()["weight"]) > 0) {
            count += parseFloat(doc.data()["count"]);
            Weight += parseFloat(doc.data()["weight"]);
          }
        });
        graphDataArr.push({
          name: product_type,
          Pipes: count,
          Weight: Weight,
        });

        // Set data if the loop will complete and Array is fully pushed
        if (ProductTypes.length === index + 1) {
          setGraphData(graphDataArr);
        }
      });
    });
  };

  // Filtering Cronologically
  const dailyGraph = (e) => {
    if (Object.keys(ProductData).length !== 0) {
      let startDate = new Date(date);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);

      let endDate = new Date(date);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      putGraphData(startDate, endDate);
      setStatus(`Showing Daily Graph of ${date}`);
    }
  };

  const monthlyGraph = (e) => {
    if (e.detail === 0) {
      let monthIndex = parseInt(e.target.options[e.target.selectedIndex].value);

      let startDate = new Date();
      startDate.setFullYear(year);
      startDate.setMonth(monthIndex);
      startDate.setDate(1);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setMilliseconds(0);
      startDate.setSeconds(0);

      let endDate = new Date();
      endDate.setFullYear(year);
      endDate.setMonth(monthIndex + 1);
      endDate.setDate(0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setMilliseconds(0);
      endDate.setSeconds(59);

      putGraphData(startDate, endDate);
      setStatus(
        `Showing Monthly Graph of ${
          e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text
        }, ${year}`
      );
    }
  };

  const yearlyGraph = (_) => {
    let startDate = new Date();
    startDate.setFullYear(year);
    startDate.setMonth(0);
    startDate.setDate(1);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);

    let endDate = new Date();
    endDate.setFullYear(year);
    endDate.setMonth(12);
    endDate.setDate(0);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(0);
    endDate.setSeconds(59);

    putGraphData(startDate, endDate);
    setStatus(`Showing Yearly Graph of ${year}`);
  };

  const set_product = () => {
    // Show Msg and set value
    if (
      thicknessInput.current.value !== "" &&
      machineNoInput.current.options[machineNoInput.current.selectedIndex]
        .value !== ""
    ) {
      setProductData({
        thickness: thicknessInput.current.value,
        machineNo:
          machineNoInput.current.options[machineNoInput.current.selectedIndex]
            .value,
      });
      setMachine(
        `Machine No: ${
          machineNoInput.current.options[machineNoInput.current.selectedIndex]
            .value
        }, Product Thickness: ${thicknessInput.current.value}`
      );
      setStatus("Now Select Time Span");
      setMsg("Set!");
    } else {
      setMsg("Please Fill up the fields correctly!");
    }

    window.setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  console.log("graphData", graphData);

  return (
    <div className="mt-10">
      <div className="flex gap-6 items-center mb-10">
        <h2 className="min-w-[400px] text-3xl font-bold">
          Product Type and Thickness
        </h2>

        <input
          type="date"
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          ref={thicknessInput}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Product Thickness
          </option>
          {ProductThickness.map((thickness) => (
            <option value={thickness}>{thickness}</option>
          ))}
        </select>

        <select
          ref={machineNoInput}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Machine No.
          </option>
          {machineNumList}
        </select>

        <button onClick={set_product}   className="bg-primary p-2 rounded-lg text-white">Set</button>

        <div className="category">
          <button
            className="bg-primary p-2 rounded-lg text-white"
            onClick={dailyGraph}
          >
            Set
          </button>
        </div>
      </div>

      <h1 className="py-4 text-center">{status}</h1>
      <ProductThicknessGraph data={graphData} />
    </div>
  );
}
