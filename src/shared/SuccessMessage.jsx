import React from "react";
import Modal from "./Modal";

export default function SuccessMessage({
  showSuccess,
  setShowSuccess,
  message,
}) {
  return (
    <Modal
      open={showSuccess}
      control={() => setShowSuccess(false)}
      width="max-w-[550px] w-full"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Operation Success</h2>
        <p className="text-green-500">* {message}</p>
        <button
          className="bg-green-500 px-4 py-2 rounded-md  text-white"
          onClick={() => setShowSuccess(false)}
        >
          Dismiss Alert
        </button>
      </div>
    </Modal>
  );
}
