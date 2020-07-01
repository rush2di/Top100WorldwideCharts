import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import { connect } from "react-redux";
import playerStyles from "./player.module.scss";
import Wave from "./wave";
import Buttons from "./buttons";
import InfoBox from "./infoBox";
import { userSavedTrack } from "../store/actions/userActions";

class Player extends Component {
  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      barWidth: 0.02,
      cursorWidth: 0,
      container: "#waveform",
      backend: "MediaElement",
      height: 65,
      minPxPerSec: 5,
      hideScrollbar: true,
      fillParent: true,
      maxCanvasWidth: 30,
      autoCenter: true,
      progressColor: "#585858a3",
      responsive: true,
      waveColor: "#21212196",
      mediaType: "audio",
      normalize: false,
      cursorColor: "#4a74a5",
      mediaControls: true,
    });
  }
  componentDidUpdate() {
    const aud = document.querySelector("#song");
    const { tracks } = this.props.playlist.playlist;
    if (tracks) {
      this.wavesurfer.load(aud);
    }
  }

  shouldComponentUpdate(nextProps) {
    const diffIndex =
      this.props.player.trackIndex !== nextProps.player.trackIndex;
    const diffTracks =
      this.props.playlist.playlist.tracks !==
      nextProps.playlist.playlist.tracks;
    return diffIndex || diffTracks;
  }

  play = () => {
    this.wavesurfer.playPause();
  };

  render() {
    const { previous, next } = this.props;
    const { trackIndex } = this.props.player;
    const { tracks } = this.props.playlist.playlist;
    const { isFetching } = this.props.playlist;
    const trackChecker = () => tracks && tracks.data[trackIndex].preview;
    return (
      <div className={playerStyles.container}>
        <div className={playerStyles.flexyFix}>
          <div className={playerStyles.infoBox}>
            {isFetching === false && (
              <InfoBox
                cover={tracks.data[trackIndex].album.cover}
                artist={tracks.data[trackIndex].artist.name}
                id={tracks.data[trackIndex].id}
                title={tracks.data[trackIndex].title}
                userUpdate={this.props.userUpdate}
                tracks={tracks}
              />
            )}
          </div>
          <div className={playerStyles.subContainer}>
            <Buttons
              trackIndex={trackIndex}
              isFetching={isFetching}
              play={this.play}
              next={next}
              previous={previous}
            />
            <Wave
              isFetching={isFetching}
              trackChecker={trackChecker}
              next={next}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { playlist: state.playlist, player: state.player };
};

const mapDispatchToProps = (dispatch) => {
  return {
    next: () => dispatch({ type: "NEXT_SONG", listLength: 100 }),
    previous: () => dispatch({ type: "PREVIOUS_SONG", listLength: 100 }),
    userUpdate: (newfav, uid) => dispatch(userSavedTrack(newfav, uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
