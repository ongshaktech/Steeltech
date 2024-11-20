import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { GetFirestoreData, useFirestore } from "../../../Hooks/firebaseFuncs";
import ProductForm from "./ProductForm";
import Modal from "../../../shared/Modal";
import ShiftForm from "./ShiftForm";

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

  return (
    <div>
      <ProductTable productData={TableData} />

      {showProductModal && (
        <Modal
          open={showProductModal}
          control={() => setshowProductModal(false)}
        >
          <ProductForm
            setFormData={setFormData}
            setshowProductModal={setshowProductModal}
          />
        </Modal>
      )}

      {showShiftModal && (
        <Modal open={showShiftModal} control={() => setshowShiftModal(false)}>
          <ShiftForm
            setShiftData={setShiftData}
            setshowProductModal={setshowProductModal}
          />
        </Modal>
      )}
    </div>
  );
}
