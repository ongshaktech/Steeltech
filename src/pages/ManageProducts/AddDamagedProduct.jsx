import React, { useEffect, useState } from "react";
import { useFirestore } from "../../Hooks/firebaseFuncs";
import DamagedProductForm from "./components/DamagedProductForm";

export default function AddDamangedProduct() {
  let [damagedProductData, setDamagedProductData] = useState({});

  const { addDocument: addDamagedProduct } = useFirestore("damagedProducts");

  useEffect(() => {
    if (Object.keys(damagedProductData).length !== 0) {
      addDamagedProduct(damagedProductData);
    }
  }, [damagedProductData]);

  return (
    <div>
      <DamagedProductForm setFormData={setDamagedProductData} />
    </div>
  );
}
