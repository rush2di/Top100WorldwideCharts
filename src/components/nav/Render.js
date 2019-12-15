import React from "react";
import { userLogout } from "../store/actions/userActions";
import { connect } from "react-redux";
import NotActive from "./notActive";
import Active from "./active";

const Render = props => {
  if (props.statut.active === true) {
    return <Active logic={props.isOpen} logOut={props.logOut} />;
  }
  return <NotActive logic={props.isOpen} />;
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(userLogout())
  };
};

export default connect(null, mapDispatchToProps)(Render);
