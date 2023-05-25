import React from "react";
/* import React, { useEffect } from "react"; */

const ChildTask = ({ children, toggleChildTodo }) => {

  const childTask = children.map((child) => {
    return (
      <div key={child.id}>
        <label>
          <input
            type="checkbox"
            checked={child.completed}
            readOnly
            onChange={() => toggleChildTodo(child.id)}
          />
        </label>
        {child.name}
      </div>
    );
  });

  return <div>{childTask}</div>;
};

export default ChildTask;
