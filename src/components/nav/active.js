import React from "react";
import { NavLink } from "react-router-dom";
import navStyles from "./nav.module.scss";

const Active = props => {
  const toggle = props.logic === true ? "open" : "closed";
  return (
    <ul className={"nav " + toggle}>
      <NavLink exact to="/" activeClassName={navStyles.active}>
        <li>Explore</li>
      </NavLink>
      <NavLink to="/user/saved-tracks" activeClassName={navStyles.active}>
        <li>Saved</li>
      </NavLink>
      <li onClick={props.logOut}>Logout</li>
    </ul>
  );
};

export default Active;
