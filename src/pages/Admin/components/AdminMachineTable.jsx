import React, { useState } from "react";
import { GetFirestoreData, useFirestore } from "../../../Hooks/firebaseFuncs";

function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2);

  return (
    <p>
      {`${day}/${month}/${year}`}
      <br />
      {date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
    </p>
  );
}

export default function AdminMachineTable() {
  let [TableData, setTableData] = useState([]);

  GetFirestoreData("products", 65).then((data) => {
    setTableData(data);
  });

  console.log("admin", TableData);

  // const { addDocument } = useFirestore("products");
  //   const { updateDocument, response } = useFirestore("latest_product");
  //   const { updateDocument: updateProduct } = useFirestore("products");

  //   const handleApprove = (item) => {
  //     updateProduct(item?.id, {
  //       ...item,
  //       status: "approve",
  //     });
  //     updateDocument(`machine_${item.machine_no}`, {
  //       ...item,
  //       status: "pending",
  //     });
  //   };

  //   const handleDecline = (item) => {
  //     updateProduct(item?.id, {
  //       ...item,
  //       status: "declined",
  //     });
  //     updateDocument(`machine_${item.machine_no}`, {
  //       ...item,
  //       status: "declined",
  //     });
  //   };

  //   useEffect(() => {
  //     if (Object.keys(formData).length !== 0) {
  //       updateProduct({
  //         ...formData,
  //         status: "pending",
  //       });
  //       updateDocument(`machine_${formData.machine_no}`, {
  //         ...formData,
  //         status: "pending",
  //       });
  //     }
  //   }, [formData]);

  // const { updateDocument: updateShift } = useFirestore("shiftTime");

  // useEffect(() => {
  //   if (Object.keys(shiftData).length !== 0) {
  //     updateShift(shiftData["shift"], shiftData);
  //     setshowShiftModal(false);
  //   }
  // }, [shiftData]);

  // const { addDocument: addDamagedProduct } = useFirestore("damagedProducts");

  // useEffect(() => {
  //   if (Object.keys(damagedProductData).length !== 0) {
  //     addDamagedProduct(damagedProductData);
  //     setdamagedProductModal(false);
  //   }
  // }, [damagedProductData]);

  return (
    <div class="relative overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary text-white font-light rounded-lg">
          <tr className=" rounded-tl-lg">
            <th className="border border-black p-2">Sl No.</th>
            <th className="border border-black p-2">Mazchine No.</th>
            <th className="border border-black p-2">
              Production Plan Change Request
            </th>
            <th className="border border-black p-2">
              Production Plan Change Approve
            </th>
            {/* <th className="border border-black p-2">Thickness</th>
          <th className="border border-black p-2">Dimension</th>
          <th className="border border-black p-2">Product Type</th> */}
            <th className="border border-black p-2">Status</th>
            <th className="border border-black p-2">Details</th>
          </tr>
        </thead>

        <tbody>
          {/* <tr> */}
          {TableData?.map((item, id) => (
            <tr>
              <td class="border border-black p-4">{id + 1}</td>
              <td class="border border-black p-4">FM {item?.machine_no}</td>
              <td class="border border-black p-4">
                {item?.creatingDate ? (
                  formatDateTime(item?.creatingDate.toDate())
                ) : (
                  <p>No date</p>
                )}
              </td>
              <td class="border border-black p-4">
                {item?.updatedDate ? (
                  formatDateTime(item?.updatedDate.toDate())
                ) : (
                  <p>No date</p>
                )}
              </td>
              {/* <td class="border border-black p-4">{item?.thickness}</td>
              <td class="border border-black p-4">
                {item?.product_dimensions}
              </td>
              <td class="border border-black p-4">{item?.product_type}</td> */}
              <td class="border border-black p-4">
                <p
                  className={`text-center ${
                    item?.status == "pending"
                      ? "text-primary"
                      : item?.status == "approved"
                      ? "text-green-500"
                      : item?.status == "declined"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {item?.status}
                </p>
              </td>
              <td class="border border-black p-4">
                <div className="">
                  <p>
                    <span className="font-bold">Production Type:</span>{" "}
                    {item?.product_type}
                  </p>
                  <p>
                    <span className="font-bold">Dimension:</span>{" "}
                    {item?.product_dimensions}
                  </p>
                  <p>
                    <span className="font-bold">Thickness:</span>{" "}
                    {item?.thickness}
                  </p>
                </div>
              </td>
            </tr>
          ))}
          {/* <td className="border border-gray-500 text-center py-4 " colSpan="13">
          Plase Select a Date Range
        </td> */}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
}
