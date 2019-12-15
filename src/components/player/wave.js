import React from "react";

const Wave = props => {
  return (
    <div>
      <div className="dummy" id="waveform" />
      <audio
        onEnded={() => setTimeout(props.next, 2000)}
        style={{ display: "none" }}
        id="song"
        src={props.trackChecker()}
      />
    </div>
  );
};

export default Wave;
