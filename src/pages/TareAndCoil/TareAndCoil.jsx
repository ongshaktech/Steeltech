import { useEffect, useState } from "react";
import { db_firestore } from "../../Hooks/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  doc,
  updateDoc, // Import updateDoc
} from "firebase/firestore";
import Tare from "./components/Tare";
import CoilChange from "./components/CoilChange";

export default function TareAndCoil() {
  let [ReportData, setReportData] = useState([]);
  let [isTare, setIsTare] = useState(true);
  let [dataLoaded, setDataLoaded] = useState(false);
  let [coilWeight, setCoilWeight] = useState({}); // State to track coil weights

  useEffect(() => {
    setDataLoaded(false);
    const ref = collection(
      db_firestore,
      isTare ? "tareUpdates" : "coilChangeUpdate"
    );
    const q = query(ref, orderBy("unix_time", "desc"), limit(50));
    onSnapshot(q, (snapShot) => {
      let items = [];
      snapShot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
        if (!isTare) {
          setCoilWeight((prev) => ({ ...prev, [doc.id]: doc.data().weight }));
        }
      });
      setReportData(items);
      setDataLoaded(true);
    });
  }, [isTare]);

  const handleUpdate = async (element, id) => {
    const docRef = doc(db_firestore, "coilChangeUpdate", id);
    const newWeight = coilWeight[id];
    console.log(id, newWeight);
    if (newWeight) {
      try {
        element.target.innerText = "wait...";
        await updateDoc(docRef, { weight: parseFloat(newWeight) });
        element.target.innerText = "Updated";
      } catch (error) {
        element.target.innerText = "error!";
      }
    } else {
      element.target.innerText = "Invalid!";
    }

    setTimeout(() => {
      element.target.innerText = "Update";
    }, 1500);
  };

  const handleWeightChange = (id, value) => {
    setCoilWeight((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <div className="flex  flex-col gap-10 pb-6">
        <h2 className="text-4xl font-sans font-medium">
          Tare and Coil Changing Updates
        </h2>
        <div className="flex gap-8 items-center text-white">
          <button
            className={`px-6 py-2 rounded-md ${isTare ? "bg-primary" : "text-black bg-primary/20"}`}
            onClick={() => setIsTare(true)}
          >
            Tare Updates
          </button>
          <button
             className={`px-6 py-2 rounded-md ${!isTare ? "bg-primary" : "text-black bg-primary/20"}`}
            onClick={() => setIsTare(false)}
          >
            Coil Changing Updates
          </button>
        </div>
      </div>
      {isTare
        ? dataLoaded && <Tare ReportData={ReportData} />
        : dataLoaded && (
            <div>
              <CoilChange
                ReportData={ReportData}
                handleUpdate={handleUpdate}
                handleWeightChange={handleWeightChange}
                coilWeight={coilWeight}
              />
            </div>
          )}
    </div>
  );
}
