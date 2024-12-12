import React, { useEffect, useState } from "react";
import { useFirestore } from "../../Hooks/firebaseFuncs";
import DamagedProductForm from "./components/DamagedProductForm";
import SuccessMessage from "../../shared/SuccessMessage";

export default function AddDamangedProduct() {
  let [damagedProductData, setDamagedProductData] = useState({});

  const { addDocument: addDamagedProduct, response } = useFirestore("damagedProducts");

  let [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (Object.keys(damagedProductData).length !== 0) {
      addDamagedProduct(damagedProductData);
    }
  }, [damagedProductData]);


  useEffect(() => {
    if (response?.success) {
      setShowSuccess(response?.success);
    }
  }, [response]);

  return (
    <div>
      <DamagedProductForm setFormData={setDamagedProductData} />
      {showSuccess && (
        <SuccessMessage
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          message="Damaged Product Added  successfully"
        />
      )}
    </div>
  );
}
