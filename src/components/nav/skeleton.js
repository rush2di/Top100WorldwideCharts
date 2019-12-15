import React from "react";
import navStyles from "./nav.module.scss";

const Skeleton = () => {
  return (
    <ul className={navStyles.nav} style={{ opacity: "0.3" }}>
      <li>
        <div className="bg mcenter" style={{ width: "5em" }} />
      </li>
      <li>
        <div className="bg mcenter" style={{ width: "4em" }} />
      </li>
      <li>
        <div className="bg mcenter" style={{ width: "4em" }} />
      </li>
    </ul>
  );
};

export default Skeleton;
