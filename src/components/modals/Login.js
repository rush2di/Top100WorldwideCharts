import React, { useState } from "react";
import Modal from "./modal";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../configs/firebase/config";

const Login = props => {
  let history = useHistory();
  const [userdata, setUserData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({ msg: "", exists: false });

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = userdata;
    if ((email.length < 6) | (password.length < 6)) {
      return setErrors({
        success: false,
        msg: "something went wrong, please retry again",
        exists: true
      });
    }
    setUserData({ ...userdata });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        if (cred.user.uid) {
          setTimeout(() => history.push("/"), 2500);
          return setErrors({ ...errors, success: true });
        }
      })
      .catch(err => {
        return setErrors({ ...errors, msg: err.message, exists: true });
      });
  };
  const handleChange = e => {
    const value = e.target.value;
    setErrors({ ...errors, msg: "", exists: false });
    setUserData({ ...userdata, [e.target.name]: value });
  };
  return (
    props.secured === true && (
      <Modal
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        type={"login"}
        {...props}
      />
    )
  );
};

const mapStateToProps = state => {
  return { statut: state.statut };
};
export default connect(mapStateToProps)(Login);
