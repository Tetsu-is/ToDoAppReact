import React from "react";
import "./input.css";

const Modal = ({ modalOpen, handleClose, handleSubmit, modalInputRef }) => {

  if (!modalOpen) return;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <input type="text" ref={modalInputRef} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
