import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db_firestore } from "../../../Hooks/config";
import DowntimeGraph from "./DowntimeGraph";
import DowntimeCustomGraph from "./DowntimeCustomGraph";
import split_time from "./GraphTime";
import DowntimeDesign from "./DowntimeDesign";

export default function DowntimeTracking() {
  let [date, setDate] = useState("");
  let [graphData, setGraphData] = useState([]);
  // let [machineNumList, setMachineNumList] = useState([]);
  // let [machine_number, setMachine_number] = useState("");
  let [machineNumbers, setMachineNumbers] = useState("");
  let [loading, setLoading] = useState(false);
  let [DataPeriod, setDataPeriod] = useState(new Date());

  console.log("DataPeriod", DataPeriod, date)

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Active",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Idle",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Active1",
        data: [93, 72, 89, 75, 115, 80],
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      legend: {
        show: false,
        // position: "top",
        // horizontalAlign: "left",
      },
      fill: {
        opacity: 1,
      },
      colors: ["#00E396", "#FF4560"],
    },
  });

  useEffect(() => {
    // Setting today's Data
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear() + "-" + month + "-" + day;
    setDate(today);

    // Collecting Machine No. list
    const ref = doc(db_firestore, `information`, "info");

    getDoc(ref).then((data) => {
      // let numList = [];
      let machineNo = [];
      const list = data.data();

      // numList.push(<optgroup label="Forming Machines"></optgroup>);
      list["forming_machine"].forEach((num, index) => {
        machineNo.push(num);
        // numList.push(
        //   <option key={index} value={num}>
        //     Machine {num}
        //   </option>
        // );
      });

      // numList.push(<optgroup label="Polish Machines"></optgroup>);
      list["polish_machine"].forEach((num, index) => {
        machineNo.push(num);
        //   numList.push(
        //     <option key={index + numList.length} value={num}>
        //       Machine {num}
        //     </option>
        //   );
      });

      setMachineNumbers(machineNo);
    });
  }, []);

  useEffect(() => {
    setData();
  }, [machineNumbers]);

  async function setData() {
    let graphDataArr = [];
    setGraphData([]);

    // Custom data filtering
    let startDate = new Date(DataPeriod);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);

    let endDate = new Date(DataPeriod);
    // set hours to 23:59:59 if the date is not today
    if (endDate.getDate() !== new Date().getDate()) {
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setMilliseconds(999);
      endDate.setSeconds(59);
    }

    startDate = Math.floor(startDate.getTime() / 1000);
    endDate = Math.floor(endDate.getTime() / 1000);

    setLoading(true);
    console.log(startDate, endDate);

    const ref = collection(db_firestore, "machineStatus");

    machineNumbers.forEach(async (num) => {
      let queryResult = [];

      const q = query(
        ref,
        where("time_start", ">=", startDate),
        where("time_start", "<=", endDate),
        where("machine_no", "==", num)
      );

      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        console.log(doc.data(), "-------------------");
        queryResult.push(doc.data());
      });
      graphDataArr.push({
        machine_no: num,
        data: split_time(900, queryResult, startDate, endDate),
      });

      if (graphDataArr.length == machineNumbers.length) {
        setLoading(false);
        setGraphData(graphDataArr);
        // setting machine no list to chart data
        // chartData.options.xaxis.categories = machineNumbers;
        // console.log(chartData);
        setChartData({
          ...chartData,
          options: {
            ...chartData.options,
            xaxis: {
              categories: machineNumbers,
            },
          },
        });
      }
    });
  }

  return (
    <div className=" my-10">
      {/* <h2>Downtime Tracking</h2> */}
      <div>
        <div className="flex gap-4 items-center">
          <h6 className="min-w-[450px] text-3xl font-bold">
          Downtime Tracking
          </h6>

          <input
            type="date"
            className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
              setDataPeriod(e.target.valueAsDate);
            }}
            // ref={dateInput}
          />

          <button
            className="bg-primary p-2 rounded-lg text-white"
            onClick={setData}
          >
            Set
          </button>
        </div>

        <h6 className="flex items-center mt-8">
          <span
            style={{
              width: "1rem",
              height: "1rem",
              background: "red",
              display: "block",
              margin: "0rem 1rem",
            }}
          ></span>{" "}
          Idle
          <span
            style={{
              width: "1rem",
              height: "1rem",
              background: "green",
              display: "block",
              margin: "0rem 1rem",
            }}
          ></span>{" "}
          Active
        </h6>
      </div>
      {/* <DowntimeGraph /> */}

      {/* <DowntimeDesign /> */}
      {graphData.length === 0 && !loading ? (
        <h1 style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          No Data Found
        </h1>
      ) : (
        <div className=" max-h-[500px] overflow-y-scroll">

        <DowntimeCustomGraph graphData={graphData} thresholdTime={900} />
        </div>
      )}

      {loading ? (
        <h1
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "2rem",
          }}
        >
          <br />
          <br />
          loading ...
        </h1>
      ) : null}
    </div>
  );
}
