import React, { useState } from "react";
import Modal from "./modal";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userSignup } from "../store/actions/userActions";

const Signup = props => {
  let history = useHistory();
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPass: ""
  });
  const [errosTypes, setError] = useState({ repass: false, field: false });

  const handleSubmit = e => {
    e.preventDefault();
    setUserData({ ...userdata });
    const { username, email, password, repeatPass } = userdata;
    if ((username.length < 6) | (password.length < 6)) {
      return setError({ ...setError, field: true });
    }
    if (password !== repeatPass) {
      return setError({ ...setError, repass: true });
    }
    let test = async () => {
      return props.signup(username, email, password);
    };
    return test().then(() => setTimeout(() => history.push("/"), 2000));
  };
  const handleChange = e => {
    const value = e.target.value;
    setError({ field: false, repass: false });
    setUserData({ ...userdata, [e.target.name]: value });
  };

  return (
    props.secured === true && (
      <Modal
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errosTypes}
        type={"signup"}
        {...props}
      />
    )
  );
};

const mapDispatchToPrps = dispatch => {
  return {
    signup: (u, e, p) => dispatch(userSignup(u, e, p))
  };
};

export default connect(mapDispatchToPrps)(Signup);
