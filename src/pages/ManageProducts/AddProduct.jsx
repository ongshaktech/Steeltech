import React, { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import { useFirestore } from "../../Hooks/firebaseFuncs";
import SuccessMessage from "../../shared/SuccessMessage";

export default function AddProduct() {
  let [formData, setFormData] = useState({});

  const { addDocument, response: addResponse } = useFirestore("products");
  const { updateDocument, response } = useFirestore("latest_product");

  let [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (Object.keys(formData).length !== 0) {
      addDocument({
        ...formData,
        status: "pending",
      });
      updateDocument(`machine_${formData.machine_no}`, {
        ...formData,
        status: "pending",
      });

      setFormData({});
    }
  }, [formData]);

  useEffect(() => {
    if (addResponse?.success && response?.success ) {
      setShowSuccess(addResponse?.success);
    }
  }, [addResponse, response]);

  return (
    <div>
      <ProductForm setFormData={setFormData} />
      {showSuccess && <SuccessMessage showSuccess={showSuccess} setShowSuccess={setShowSuccess} message="Product added successfully" />}
    </div>
  );
}
