import { useEffect, useState } from "react";
import Machine_Logo from "../../../assets/images/Machine_Logo.svg";
import { collection, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";

export default function RealtimeMachineData() {
  let [ReportData, setReportData] = useState([]);
  //   let [snap, setSnap] = useState(null);
  //   let [pageIndex, setPageIndex] = useState(0);
  //   let [fetchedDataNum, setFetchedDataNum] = useState(0);

  const dataPerPage = 30;

  const collection_name = "machines";

  useEffect(() => {
    const ref = collection(db_firestore, collection_name);
    const q = query(ref, orderBy("unix_time", "desc"), limit(dataPerPage));
    putDataInTable(q, 0);
  }, []);

  const putDataInTable = (q, increase) => {
    onSnapshot(q, (snapShot) => {
      setReportData((prevReportData) => {
        let items = [];
        snapShot.forEach((doc) => {
          // Extract document data
          const newItem = { id: doc?.id, ...doc?.data() };

          // Check if the item already exists in the previous state
          const isExisting = prevReportData.some(
            (report) => report.id == newItem.id
          );

          // Assign status
          newItem.status =
            prevReportData?.length === 0 ? "old" : isExisting ? "old" : "new";

          //   if (!isExisting) {
          items.push(newItem);
          //   }
        });

        // Update page index
        // if (items.length > 0) {
        //   setSnap(snapShot);
        //   setFetchedDataNum(items.length);
        //   setPageIndex(pageIndex + increase);
        //   setPageIndex((prevPageIndex) => prevPageIndex + increase);
        // }

        // Return only the latest 30 items
        return items;
      });
    });
  };

  return (
    <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] p-8 rounded-lg">
      <h2 className="text-3xl">Real-Time Machine Data</h2>
      <div className="grid grid-cols-6 items-center gap-6 bg-primary rounded-full p-4 text-white mt-6">
        <p>Machine Names</p>
        <p>Status</p>
        <p>Shift</p>
        <p>Product Type</p>
        <p>Production weight</p>
        <p>Production Count</p>
      </div>
      {ReportData?.slice(0, 5)?.map((report) => (
        <div
          className={`grid grid-cols-6 items-center gap-6  rounded-md p-2 text-black mt-6 ${
            report?.status == "new" ? "bg-green-100" : ""
          }`}
        >
          <p className="flex gap-2 items-center">
            <img src={Machine_Logo} alt="" className="w-10 h-10" />
            FM {report?.machine_no}
          </p>
          <p>Active</p>
          <p>{report?.shift}</p>
          <p>
            {report?.product_type}, {report?.product_dimensions}
          </p>
          <p>{report?.weight} KG</p>
          <p>{report?.count}</p>
        </div>
      ))}
      {/* <div className="grid grid-cols-6 items-center gap-6  rounded-full p-2 text-black mt-6">
        <p className="flex gap-2 items-center">
          <img src={Machine_Logo} alt="" className="w-10 h-10" />
          FM 01
        </p>
        <p>Active</p>
        <p>Morning</p>
        <p>Round Pipe, 3/8 inch, 0.4 mm</p>
        <p>30kg</p>
        <p>5</p>
      </div> */}
    </div>
  );
}
