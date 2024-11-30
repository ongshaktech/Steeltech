import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db_firestore } from "../../../Hooks/config";
import { GetFirestoreData } from "../../../Hooks/firebaseFuncs";
import ShiftbasedProductionPieChart from "./ShiftbasedProductionPieChart";

export default function ShiftBasedProduction() {
  const collection_name = "machinesIndividual";
  let [dateStart, setDateStart] = useState(new Date());
  let [dateEnd, setDateEnd] = useState(new Date());
  let tableBodyRef = useRef(null);
  let tableHeaderRef = useRef(null);
  let [MachineNoList, setMachineNoList] = useState(new Set([]));
  let [btnStatus, setBtnStatus] = useState(true);

  let [machineDetails, setMachineDetails] = useState([]);
  let [damageDetails, setDamageDetails] = useState([]);
  let [tableStatus, setTableStatus] = useState("");
  let [thickness, setThickness] = useState("");

  let [pieChartData, setPieChartData] = useState([]);

  console.log("machineDetails", machineDetails);

  useEffect(() => {
    let MachineNo = new Set([]);

    // Get Machine Number List
    const ref = doc(db_firestore, `information`, "info");
    getDoc(ref).then((data) => {
      let list = data.data();
      list["forming_machine"].forEach((index) => {
        MachineNo.add(index);
      });
      list["polish_machine"].forEach((index) => {
        MachineNo.add(index);
      });

      setMachineNoList(MachineNo);

      // ProductThickness.forEach((thickness) => {
      //   procductThicknessDiv += `<th class="border border-black p-2">${thickness}</th>`;
      // });

      // tableHeaderRef.current.innerHTML = `<tr>${procductThicknessDiv}<tr>`;
    });
  }, []);

  const generateReport = () => {
    let startDate = new Date(dateStart);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(1);
    startDate.setMilliseconds(0);

    let endDate = new Date(dateEnd);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(99);
    endDate.setSeconds(59);

    if (dateEnd === "" || dateStart === "") {
      setTableStatus("Date Ranges cannot be empty!");
      return null;
    } else if (startDate.getTime() > endDate.getTime()) {
      setTableStatus("Start date should be less than end date");
      return null;
    }

    setTableStatus("Please be Patient ...");

    setBtnStatus(false);
    putData(startDate, endDate);
  };

  //   const setTableStatus = (prompt) => {
  //     tableBodyRef.current.innerHTML = `<tr>
  //                 <td class='border border-black p-2' id='reportStatus' colSpan=${
  //                   ProductThickness.length + 1
  //                 }>
  //                     ${prompt}
  //                 </td>
  //             </tr>`;
  //   };

  // async function putData(startDate, endDate) {
  //   const ref = collection(db_firestore, "machineStatus");
  //   const MachineRef = collection(db_firestore, collection_name);
  //   const currentMachineDetails = [];

  //   // let machine_number = "01";

  //   // Getting Time Start and Time End
  //   let total_time = 0;

  //   Array.from(MachineNoList).forEach((machine_number, index) => {
  //     let q = query(
  //       ref,
  //       where("time_start", ">=", Math.floor(startDate.getTime() / 1000)),
  //       where("time_start", "<=", Math.floor(endDate.getTime() / 1000)),
  //       where("machine_no", "==", `${machine_number}`),
  //       where("isRunning", "==", true)
  //     );

  //     getDocs(q).then((snap) => {
  //       snap.forEach((result) => {
  //         total_time += result.data()["time_end"] - result.data()["time_start"];
  //       });

  //       let totalWeight = [];
  //       //   for (const thickness of ProductThickness) {
  //       let weight = 0;
  //       q = query(
  //         MachineRef,
  //         where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
  //         where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
  //         where("machine_no", "==", `${machine_number}`)
  //       );

  //       getDocs(q).then((snap) => {
  //         snap.forEach((result) => {
  //           weight += parseInt(result.data()["weight"]);
  //         });
  //         weight !== 0
  //           ? totalWeight.push(weight.toFixed(2))
  //           : totalWeight.push(0);
  //       });
  //       currentMachineDetails.push({
  //         machine_number,
  //         totalWeight,
  //       });
  //       //   }

  //       setMachineDetails(currentMachineDetails);
  //       setBtnStatus(true);
  //     });
  //   });
  // }

  async function putData(startDate, endDate) {
    const ref = collection(db_firestore, "machineStatus");
    const MachineRef = collection(db_firestore, collection_name);

    const promises = Array.from(MachineNoList).map(async (machine_number) => {
      // Query for time range and machine
      const q1 = query(
        ref,
        where("time_start", ">=", Math.floor(startDate.getTime() / 1000)),
        where("time_start", "<=", Math.floor(endDate.getTime() / 1000)),
        where("machine_no", "==", `${machine_number}`),
        where("isRunning", "==", true)
      );

      const q2 = query(
        MachineRef,
        where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
        where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
        where("machine_no", "==", `${machine_number}`)
        // where("shift", "===", "Night")
      );

      let total_time = 0;
      const timeSnap = await getDocs(q1);
      timeSnap.forEach((result) => {
        total_time += result.data()["time_end"] - result.data()["time_start"];
      });

      let weight = 0;
      const weightSnap = await getDocs(q2);
      weightSnap.forEach((result) => {
        weight += parseInt(result.data()["weight"]);
      });

      return {
        machine_number,
        totalWeight: weight !== 0 ? weight.toFixed(2) : 0,
      };
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Update state
    setMachineDetails(results);
    setBtnStatus(true);
  }

  async function getDamageData() {
    let initialData = [];
    const querySnapshot = await getDocs(
      collection(db_firestore, "damagedProducts")
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      initialData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setDamageDetails(initialData);
  }

  console.log("machineDetails", damageDetails, machineDetails);

  // useEffect(() => {
  //   let totalProductionWeight = machineDetails?.reduce((acc, cur) => {
  //     return Number(acc) + Number(cur?.totalWeight);
  //   }, 0);

  //   setPieChartData([
  //     ...pieChartData,
  //     {
  //       name: "Production Weight",
  //       weight: totalProductionWeight,
  //     },
  //   ]);
  // }, [machineDetails]);

  // useEffect(() => {
  //   let totalProductionDamageWeight = damageDetails?.reduce((acc, cur) => {
  //     if (cur?.damagedCategory == "damaged_product") {
  //       return Number(acc) + Number(cur?.weight);
  //     }
  //     return acc;
  //   }, 0);

  //   setPieChartData([
  //     ...pieChartData,
  //     {
  //       name: "Damaged Weight",
  //       weight: totalProductionDamageWeight,
  //     },
  //   ]);
  // }, [damageDetails]);

  // console.log("pieChartData", pieChartData);


  useEffect(() => {
    const updatePieChartData = () => {
      // Calculate total production weight
      const totalProductionWeight = machineDetails?.reduce((acc, cur) => {
        return acc + Number(cur?.totalWeight || 0);
      }, 0);
  
      // Calculate total damaged production weight
      const totalProductionDamageWeight = damageDetails?.reduce((acc, cur) => {
        if (cur?.damagedCategory === "damaged_product") {
          return acc + Number(cur?.weight || 0);
        }
        return acc;
      }, 0);

      const totalProductionScrapWeight = damageDetails?.reduce((acc, cur) => {
        if (cur?.damagedCategory === "scrap_product") {
          return acc + Number(cur?.weight || 0);
        }
        return acc;
      }, 0);
      const totalProductionCutWeight = damageDetails?.reduce((acc, cur) => {
        if (cur?.damagedCategory === "cut_piece_product") {
          return acc + Number(cur?.weight || 0);
        }
        return acc;
      }, 0);
      const totalProductionBGradeWeight = damageDetails?.reduce((acc, cur) => {
        if (cur?.damagedCategory === "b_grade_product") {
          return acc + Number(cur?.weight || 0);
        }
        return acc;
      }, 0);
  
      // Update pie chart data
      setPieChartData([
        {
          name: "Production Weight",
          weight: totalProductionWeight,
        },
        {
          name: "Damaged Weight",
          weight: totalProductionDamageWeight,
        },
        {
          name: "Scrap Weight",
          weight: totalProductionScrapWeight,
        },
       
        {
          name: "Cut-Piece",
          weight: totalProductionCutWeight,
        },
        {
          name: "B-Grade",
          weight: totalProductionBGradeWeight,
        },
       
      ]);
    };
  
    updatePieChartData();
  }, [machineDetails, damageDetails]); 

  return (
    <div>
      <button
        className="btn-primary"
        onClick={() => {
          generateReport();
          getDamageData();
        }}
      >
        Show
      </button>
      <ShiftbasedProductionPieChart data={pieChartData} />
    </div>
  );
}
