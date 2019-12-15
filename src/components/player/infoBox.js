import React from "react";
import iBoxStyles from "./infoBox.module.scss";
import { connect } from "react-redux";
import favicon from "../assetes/fav.svg";
import favActive from "../assetes/favActive.svg";

const InfoBox = props => {
  const { cover, artist, title, id, userData, userUpdate } = props;
  let { likedTracks, userId } = userData;

  const iconRender = () => {
    for (let track in likedTracks) {
      if (likedTracks[track].id === id) {
        return favActive;
      }
    }
    return favicon;
  };

  const favbtn = () => {
    let newfavs = [];
    if (userId !== "") {
      if (likedTracks.length > 0) {
        newfavs = [...likedTracks];
        for (let track in likedTracks) {
          if (likedTracks[track].id === id) {
            newfavs.splice(track, 1);
            return userUpdate(userId, newfavs);
          }
        }
        newfavs.push({ id, artist, title });
        return userUpdate(userId, newfavs);
      }
    }
    return alert("sign up or login to be able to save");
  };

  return (
    <div className={iBoxStyles.container}>
      <img src={cover} alt="cover-art" />
      <div className={iBoxStyles.textInfo}>
        <div className={iBoxStyles.artist}>{artist}</div>
        <span className="titleMin">{title}</span>
        <div
          onClick={favbtn}
          style={{
            backgroundImage: `url(${iconRender()})`
          }}
          className={iBoxStyles.icn}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { userData: state.statut };
};

export default connect(mapStateToProps)(InfoBox);
