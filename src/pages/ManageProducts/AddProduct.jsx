import React, { useEffect, useState } from 'react'
import ProductForm from './components/ProductForm';
import {  useFirestore } from '../../Hooks/firebaseFuncs';

export default function AddProduct() {
    let [formData, setFormData] = useState({});
  
    const { addDocument } = useFirestore("products");
    const { updateDocument, response } = useFirestore("latest_product");
  
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

        setFormData({})
      }
    }, [formData]);


  return (
    <div>
         <ProductForm
            setFormData={setFormData}
          />
    </div>
  )
}
