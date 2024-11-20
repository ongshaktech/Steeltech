import React, { useEffect, useState } from "react";
import ManageUserTable from "./ManageUserTable";
import Modal from "../../../shared/Modal";
import UserForm from "./UserForm";
import { GetFirestoreData, useFirestore } from "../../../Hooks/firebaseFuncs";

export default function ManageUserDetails({ showUserModal, setshowUserModal }) {
  let [formData, setFormData] = useState({});
  let [TableData, setTableData] = useState([]);

  GetFirestoreData("users").then((data) => {
    setTableData(data);
  });

  const { addDocument } = useFirestore("users");

  useEffect(() => {
    if (Object.keys(formData).length !== 0) {
      addDocument(formData);
    }
  }, [formData]);

  return (
    <div>
      <ManageUserTable userdata={TableData} />

      {showUserModal && (
        <Modal open={showUserModal} control={() => setshowUserModal(false)}>
          <UserForm
            setFormData={setFormData}
            setshowUserModal={setshowUserModal}
          />
        </Modal>
      )}
    </div>
  );
}
