import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { GetFirestoreData, useFirestore } from "../../../Hooks/firebaseFuncs";

export default function ManageProductTable({
  setshowProductModal,
  showProductModal,
  setshowShiftModal,
  showShiftModal,
  damagedProductModal,
  setdamagedProductModal,
}) {
  let [TableData, setTableData] = useState([]);
  let [formData, setFormData] = useState({});
  let [shiftData, setShiftData] = useState({});
  let [damagedProductData, setDamagedProductData] = useState({});

  GetFirestoreData("products", 65).then((data) => {
    setTableData(data);
  });

  const { addDocument } = useFirestore("products");
  const { updateDocument } = useFirestore("latest_product");

  useEffect(() => {
    if (Object.keys(formData).length !== 0) {
      addDocument(formData);
      updateDocument(`machine_${formData.machine_no}`, formData);
    }
  }, [formData]);

  const { updateDocument: updateShift } = useFirestore("shiftTime");

  useEffect(() => {
    if (Object.keys(shiftData).length !== 0) {
      updateShift(shiftData["shift"], shiftData);
      setshowShiftModal(false);
    }
  }, [shiftData]);

  const { addDocument: addDamagedProduct } = useFirestore("damagedProducts");

  useEffect(() => {
    if (Object.keys(damagedProductData).length !== 0) {
      addDamagedProduct(damagedProductData);
      setdamagedProductModal(false);
    }
  }, [damagedProductData]);

  console.log("TableData", TableData);

  return (
    <div>
      <ProductTable productData={TableData} />
    </div>
  );
}
