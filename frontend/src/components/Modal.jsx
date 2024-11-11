import React from "react";
import MyModal from "./ShowModal";

const Modal = ({ confirmDelete, setShowModal }) => {
  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <MyModal
      confirmDelete={confirmDelete}
      toggleShowModal={toggleShowModal}
    />
  );
};

export default Modal;
