import React from "react";

const MenuBtn = ({ isOpen }) => {
  const toggle = isOpen === true && "active";
  return (
    <div className={`hamBtn ${toggle}`}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default MenuBtn;
