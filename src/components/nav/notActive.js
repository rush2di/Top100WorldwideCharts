import React from "react";
import { NavLink } from "react-router-dom";
import navStyles from "./nav.module.scss";

const NotActive = props => {
  const toggle = props.logic === true ? "open" : "closed";
  return (
    <ul className={"nav " + toggle}>
      <NavLink exact to="/" activeClassName={navStyles.active}>
        <li>Explore</li>
      </NavLink>
      <NavLink to="/signup">
        <li>Sign up</li>
      </NavLink>
      <NavLink to="/login">
        <li>Login</li>
      </NavLink>
    </ul>
  );
};

export default NotActive;
