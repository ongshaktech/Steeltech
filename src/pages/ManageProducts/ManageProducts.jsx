import React, { useState } from "react";
import ManageProductHeading from "./components/ManageProductHeading";
import ManageProductTable from "./components/ManageProductTable";

export default function ManageProducts() {
  let [showProductModal, setshowProductModal] = useState(false);
  let [showShiftModal, setshowShiftModal] = useState(false);
  let [damagedProductModal, setdamagedProductModal] = useState(false);

  return (
    <div>
      <ManageProductHeading
        setshowProductModal={setshowProductModal}
        setshowShiftModal={setshowShiftModal}
        setdamagedProductModal={setdamagedProductModal}
      />
      <ManageProductTable
        setshowProductModal={setshowProductModal}
        showProductModal={showProductModal}
        setshowShiftModal={setshowShiftModal}
        showShiftModal={showShiftModal}
        damagedProductModal={damagedProductModal}
        setdamagedProductModal={setdamagedProductModal}
      />
    </div>
  );
}
