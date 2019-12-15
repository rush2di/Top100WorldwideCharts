import React from "react";
import modalStyles from "./modal.module.scss";
import { useHistory } from "react-router-dom";

const Modal = props => {
  let history = useHistory();
  const slug = `/${props.type}`;
  let style = { field: {}, repass: {}, error: {}, notifification: {} };

  if (props.type === "signup") {
    style.repass =
      props.errors.repass === true
        ? { borderColor: "red" }
        : { borderColor: "" };
    style.field =
      props.errors.field === true
        ? { borderColor: "red" }
        : { borderColor: "" };
  }
  if (props.type === "login") {
    style.error =
      props.errors.exists === true
        ? { borderColor: "red" }
        : { borderColor: "" };
    style.notifification =
      props.errors.success === true ? { color: "#17ec3b" } : { color: "red" };
  }

  return (
    props.location.pathname === slug && (
      <div className={modalStyles.container}>
        <div className={modalStyles.modal}>
          {props.type === "login" && (
            <form onSubmit={props.handleSubmit}>
              <label>Email</label>
              <input
                style={style.error}
                onChange={props.handleChange}
                name="email"
                type="text"
              />
              <label>Password</label>
              <input
                style={style.error}
                onChange={props.handleChange}
                name="password"
                type="password"
              />
              <span style={style.notifification}>
                {props.errors.exists === true && props.errors.msg}
                {props.errors.success === true && "successfully logged in!"}
              </span>
              <button type="submit">Login</button>
            </form>
          )}
          {props.type === "signup" && (
            <form onSubmit={props.handleSubmit}>
              <label>Username</label>
              <input
                style={style.field}
                onChange={props.handleChange}
                name="username"
                type="text"
              />
              <label>Email</label>
              <input
                onChange={props.handleChange}
                name="email"
                type="text"
                style={style.field}
              />
              <label>Password</label>
              <input
                onChange={props.handleChange}
                name="password"
                type="password"
                style={style.repass}
              />
              <label>Repeat Password</label>
              <input
                onChange={props.handleChange}
                name="repeatPass"
                type="password"
                style={style.repass}
              />
              <span style={{ color: "red" }}>
                {props.errors.field === true &&
                  "username and password should be six or more characters long"}
                {props.errors.repass === true && "passwords don't match"}
              </span>
              <button type="submit">Sign up</button>
            </form>
          )}
        </div>
        <div onClick={() => history.push("/")} className={modalStyles.bg} />
      </div>
    )
  );
};

export default Modal;
