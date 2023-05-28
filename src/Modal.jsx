import React from "react";
import "./input.css";

const Modal = ({ modalOpen, handleClose, handleSubmit, modalInputRef }) => {

  if (!modalOpen) return;

  return (
    <div className="block fixed z-10 pt-100 l-0 t-0 w-full h-full overflow-auto bg-black bg-opacity-40">
      <div className="bg-white rounded-md mt-60 m-auto pt-5 p-10 b-1 h-10 w-3/5 ">
        <button className="text-gray-400 float-right text-3xl font-bold hover:text-black focus:text-black" onClick={handleClose}>&times;</button>
        <input className="w-80 border border-gray-500 mr-5" type="text" ref={modalInputRef} placeholder="小タスクの名前"/>
        <button className="rounded-md border border-black p-1" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
