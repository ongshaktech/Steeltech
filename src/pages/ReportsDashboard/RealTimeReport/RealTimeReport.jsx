import React, { useEffect, useState } from "react";
import RealTimeReportTable from "./components/RealTimeReportTable";
import { collection, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";

export default function RealTimeReport() {
  let [ReportData, setReportData] = useState([]);
  let [snap, setSnap] = useState(null);
  let [pageIndex, setPageIndex] = useState(0);
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
          const newItem = { id: doc?.id, ...doc.data() };

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
          setPageIndex(pageIndex + increase);
        }

        // Return only the latest 30 items
        return items;
      });
    });
  };

  //   const putDataInTable = (q, increase) => {
  //     onSnapshot(q, (snapShot) => {
  //       let items = [];
  //       snapShot.forEach((doc) => {
  //         console.log("doc", { id: doc?.id, ...doc.data() });
  //         // let newItem = ReportData.find(report => report?.)
  //         items.push({ id: doc?.id, ...doc.data() });
  //       });

  //       //   setFetchedDataNum(items.length);
  //       if (items.length !== 0) {
  //         setSnap(snapShot);
  //         setReportData(items);
  //         setPageIndex(pageIndex + increase);
  //       }
  //     });
  //   };

  // Pagination
  const handleNextPage = () => {
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
    let collectionRef = collection(db_firestore, collection_name);

    const q = query(
      collectionRef,
      orderBy("unix_time", "desc"),
      endBefore(snap.docs[0]),
      limitToLast(dataPerPage)
    );

    putDataInTable(q, -1);
  };

  console.log("ReportData", ReportData);

  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Realtime Report </h2>
      <RealTimeReportTable
        ReportData={ReportData}
        startIndex={pageIndex * dataPerPage}
      />
    </div>
  );
}
