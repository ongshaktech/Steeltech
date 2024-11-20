import { useEffect, useState } from "react";
import Machine_Logo from "../../../assets/images/new_machine.svg";
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
  let [product, setProduct] = useState({
    product_type: "",
    thickness: "",
    product_dimensions: "",
  });

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

      console.log("updatedData", updatedData);

      setProduct({
        product_type: updatedData[0]?.product_type,
        thickness: updatedData[0]?.thickness,
        product_dimensions: updatedData[0]?.product_dimensions
      });
      setTotalProduct(updatedData[0]?.count ? updatedData[0]?.count : 0);
      setTotalWeight(
        updatedData[0]?.weight == "" || NaN || null ? 0 : updatedData[0]?.weight
      );

      // snapShot.forEach((doc) => {
      //   setTotalProduct(doc.data().count ? doc.data().count : 0);
      //   setTotalWeight(
      //     doc.data().weight == "" || NaN || null ? 0 : doc.data().weight
      //   );
      // });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`border-[3px]  rounded-lg ${
        props?.active ? "border-[#009245]" : "border-[#ED1C24]"
      }`}
    >
      <div className="flex gap-4 justify-between h-full ">
        <div className="w-full flex flex-col gap-2 justify-between p-3">
          <h2 className="text-2xl font-semibold">FM {props.machineNo}</h2>
          <button className="flex gap-2 items-center bg-black text-white px-4 py-2 rounded-md">
            <div
              className={`w-4 h-4 rounded-full ${
                props?.active ? "bg-[#009245]" : "bg-[#ED1C24]"
              }`}
            ></div>
            <p>{props?.active ? "Active" : "Idle"}</p>
          </button>

          <div className="pt-3">
            <p>(Last updated {props.idleTime} ago)</p>
            <p>Total Product: {totalProduct}</p>
            <p>Total Weight: {totalWeight} kg</p>
          </div>
        </div>
        <div className="min-w-[90px]  bg-black/80 text-white flex flex-col justify-between items-center  px-2 py-6">
          <img src={Machine_Logo} alt="" className="w-[60px] h-auto" />
          <div className="text-center text-xs">
            <p>{product?.product_type}</p>
            <p>{product?.thickness}</p>
            <p>{product?.product_dimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
