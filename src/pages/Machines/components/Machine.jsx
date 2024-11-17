import { useEffect, useState } from "react";
import Machine_Logo from "../../../assets/images/Machine_Logo.svg";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";

export default function Machine(props) {
  //   export default function Machine({ meta, machineNo, active, idleTime }) {
  let [totalProduct, setTotalProduct] = useState(0);
  let [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    let collectionRef = collection(db_firestore, "machines");
    const q = query(
      collectionRef,
      where("machine_no", "==", props.machineNo),
      orderBy("unix_time", "desc"),
      limit(1)
    );

    let unsubscribe = onSnapshot(q, (snapShot) => {
      const updatedData = snapShot.docs.map((doc) => ({
        id: doc.id, // Include document ID if needed
        ...doc.data(),
      }));

      setTotalProduct(updatedData[0]?.count ? updatedData[0]?.count : 0);
        setTotalWeight(
          updatedData[0]?.weight == "" || NaN || null ? 0 : updatedData[0]?.weight
        );

      console.log("updatedData[0]?", updatedData[0]);
      // snapShot.forEach((doc) => {
      //   setTotalProduct(doc.data().count ? doc.data().count : 0);
      //   setTotalWeight(
      //     doc.data().weight == "" || NaN || null ? 0 : doc.data().weight
      //   );
      // });
    });

    return () => unsubscribe();
  }, []);

  console.log("totalProduct", totalProduct);
  console.log("totalWeight", totalWeight);

  return (
    <div
      className={`border-[3px] p-4 rounded-lg ${
        props?.active ? "border-[#009245]" : "border-[#ED1C24]"
      }`}
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">FM {props.machineNo}</h2>
          <button className="flex gap-2 items-center bg-black text-white px-4 py-2 rounded-md">
            <div
              className={`w-4 h-4 rounded-full ${
                props?.active ? "bg-[#009245]" : "bg-[#ED1C24]"
              }`}
            ></div>
            <p>{props?.active ? "Active" : "Idle"}</p>
          </button>
        </div>
        <div className="">
          <img src={Machine_Logo} alt="" />
        </div>
      </div>
      <div className="pt-3">
        <p>(Last updated {props.idleTime} ago)</p>
        <p>Total Product: {totalProduct}</p>
        <p>Total Weight: {totalWeight} kg</p>
      </div>
    </div>
  );
}
