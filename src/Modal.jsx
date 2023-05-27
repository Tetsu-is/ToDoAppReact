import React from "react";
import "./input.css";

const Modal = ({ modalOpen, handleClose, handleSubmit, modalInputRef }) => {

  if (!modalOpen) return;

  return (
    <div className="block fixed z-1 pt-100 l-0 t-0 w-full h-full overflow-auto bg-black bg-opacity-40">
      <div className="bg-white rounded-md mt-20 m-auto p-20 b-1 h-30 w-4/5 ">
        <button className="text-gray-400 float-right text-3xl font-bold hover:text-black focus:text-black" onClick={handleClose}>&times;</button>
        <input className="border border-gray-500" type="text" ref={modalInputRef} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
