import React from "react";
import "./input";

const InputModal = ({ modalOpen, handleClose, handleSubmit, modalInputRef }) => {
  if (!modalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <input type='text' ref={modalInputRef} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InputModal;
