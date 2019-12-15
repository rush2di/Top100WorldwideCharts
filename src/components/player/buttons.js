import React, { useState, useEffect } from "react";
import buttonStyles from "./buttons.module.scss";
import next from "../assetes/next.svg";
import prev from "../assetes/prev.svg";
import play from "../assetes/play.svg";
import pause from "../assetes/pause.svg";

const Buttons = props => {
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => setIsPlaying(true), [props.trackIndex, props.isFetching]);
  const toggler = !!isPlaying ? play : pause;
  const toggleLogic = con => {
    if (con === false) {
      setIsPlaying(!isPlaying);
      return props.play();
    }
    return null;
  };
  return (
    <div className={buttonStyles.container}>
      <button
        style={{ backgroundImage: `url(${prev})` }}
        onClick={props.previous}
        className={buttonStyles.circlBtnSm}
      />
      <button
        style={{ backgroundImage: `url(${toggler})` }}
        onClick={() => toggleLogic(props.isFetching)}
        className={buttonStyles.circlBtnLg}
      />
      <button
        style={{ backgroundImage: `url(${next})` }}
        onClick={props.next}
        className={buttonStyles.circlBtnSm}
      />
    </div>
  );
};

export default Buttons;
