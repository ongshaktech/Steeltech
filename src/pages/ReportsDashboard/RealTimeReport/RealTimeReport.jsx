import React, { useEffect, useState } from "react";
import RealTimeReportTable from "./components/RealTimeReportTable";
import { db_firestore } from "../../../Hooks/config";
// import { endBefore, limitToLast, query, startAfter } from "firebase/database";

import { collection, query, orderBy, limit, onSnapshot, limitToLast } from 'firebase/firestore';
import { startAfter, endBefore } from 'firebase/firestore';

export default function RealTimeReport() {
  let [ReportData, setReportData] = useState([]);
  let [snap, setSnap] = useState(null);
  let [pageIndex, setPageIndex] = useState(0);
  let [fetchedDataNum, setFetchedDataNum] = useState(0);

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

          items.push(newItem);
        });

        // Update page index
        if (items.length > 0) {
            setSnap(snapShot);
            setFetchedDataNum(items.length);
        //   setPageIndex(pageIndex + increase);
          setPageIndex((prevPageIndex) => prevPageIndex + increase);
        }

        // Return only the latest 30 items
        return items;
      });
    });
  };


  // Pagination
  const handleNextPage = () => {
    if (!snap) {
        console.error("Snapshot is not available yet.");
        return;
      }

    console.log("CLicked")
    let collectionRef = collection(db_firestore, collection_name);

    const q = query(
      collectionRef,
      orderBy("unix_time", "desc"),
      startAfter(snap.docs[ReportData.length - 1]),
      limit(dataPerPage)
    );
    putDataInTable(q, 1);
  };

  const handlePreviousPage = () => {
    if (!snap) {
        console.error("Snapshot is not available yet.");
        return;
      }
    let collectionRef = collection(db_firestore, collection_name);

    const q = query(
      collectionRef,
      orderBy("unix_time", "desc"),
      endBefore(snap.docs[0]),
      limitToLast(dataPerPage)
    );

    putDataInTable(q, -1);
  };


  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Realtime Report </h2>
      <RealTimeReportTable
        ReportData={ReportData}
        startIndex={pageIndex * dataPerPage}
      />

      <div className="flex justify-center items-center py-20 gap-10">
        <button
          className={`px-6 py-2 rounded-full text-xl ${pageIndex === 0 ? "bg-gray-500" : "bg-yellow-500"}`}
          onClick={handlePreviousPage}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <button
          className={`px-6 py-2 rounded-full  text-xl ${fetchedDataNum < dataPerPage ? "bg-gray-500" : "bg-yellow-500"}`}
          onClick={handleNextPage}
          disabled={fetchedDataNum < dataPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
