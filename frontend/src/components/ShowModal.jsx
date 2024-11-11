import React, { useEffect } from "react";

const MyModal = ({ confirmDelete, toggleShowModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div className="modal-wrapper" onClick={toggleShowModal}></div>
      <div className="modal-container">
        <h2>Are you sure you want to delete this task?</h2>
        <div className="modal-buttons">
          <button className="modal-btn bg-red-400 hover:bg-red-300" onClick={confirmDelete}>
            Yes
          </button>
          <button className="modal-btn bg-yellow-400 hover:bg-yellow-300" onClick={toggleShowModal}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default MyModal;
