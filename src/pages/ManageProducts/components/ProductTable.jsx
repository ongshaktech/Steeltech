import React from "react";

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

  
  export default function ProductTable({ productData }) {
  return (
    <table className="w-full">
      <thead className="bg-primary text-white font-light rounded-lg">
        <tr className=" rounded-tl-lg">
          <th className="border border-black p-2">Sl No.</th>
          <th className="border border-black p-2">Mazchine No.</th>
          <th className="border border-black p-2">Thickness</th>
          <th className="border border-black p-2">Dimension</th>
          <th className="border border-black p-2">Product Type</th>
          <th className="border border-black p-2">Added On</th>
        </tr>
      </thead>

      <tbody>
        {/* <tr> */}
          {productData?.filter(item => item?.status == "approved")?.map((item, id) => (
            <tr>
              <td class="border border-black p-4">{id + 1}</td>
              <td class="border border-black p-4">{item?.machine_no}</td>
              <td class="border border-black p-4">{item?.thickness}</td>
              <td class="border border-black p-4">
                {item?.product_dimensions}
              </td>
              <td class="border border-black p-4">{item?.product_type}</td>
              <td class="border border-black p-4">
                {item?.creatingDate ? (
                  formatDateTime(item.creatingDate.toDate())
                ) : (
                  <p>No date</p>
                )}
              </td>
            </tr>
          ))}
          {/* <td className="border border-gray-500 text-center py-4 " colSpan="13">
            Plase Select a Date Range
          </td> */}
        {/* </tr> */}
      </tbody>
    </table>
  );
}
