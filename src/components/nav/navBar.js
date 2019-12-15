import React, { useState } from "react";
import { connect } from "react-redux";
import Render from "./Render";
import { Link } from "react-router-dom";
import Logo from "../assetes/logo";
import Skeleton from "./skeleton";
import navStyles from "./nav.module.scss";
import MenuBtn from "./menuBtn";

const NavBar = props => {
  const [menuBtn, setmenuBtn] = useState({ isOpen: false });
  const toggle = () => {
    setmenuBtn({ isOpen: !menuBtn.isOpen });
  };

  return (
    <nav className={navStyles.navWrapper}>
      <span className={navStyles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </span>
      <span onClick={toggle} className={navStyles.menu}>
        <MenuBtn isOpen={menuBtn.isOpen} />
      </span>
      {!!props.statut.mount ? (
        <Render {...props} isOpen={menuBtn.isOpen} />
      ) : (
        <Skeleton />
      )}
    </nav>
  );
};

const mapStateToProps = state => {
  return { statut: state.statut };
};

export default connect(mapStateToProps)(NavBar);
