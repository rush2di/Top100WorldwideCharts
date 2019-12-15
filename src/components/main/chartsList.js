import React, { useEffect } from "react";
import PlaylistTable from "./playlistTable";
import { fetchPlaylist } from "../store/actions/chartActions";
import chartListStyles from "./chartList.module.scss";
import { connect } from "react-redux";
import Skeleton from "../assetes/skeleton";
import posed, { PoseGroup } from "react-pose";

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const Div = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const ChartsList = props => {
  let { params } = props.match;
  let { userSetTrack } = props;
  let { playlistId, playlist, isFetching } = props.charts;

  useEffect(() => {
    if (playlistId != params.id) {
      props.reset();
      return props.playlist(params.id);
    }
    return;
  }, [params]);

  const SkeletonContainer = () => {
    return (
      <div style={{ marginTop: "1em", height: "70vh", opacity: 0.2 }}>
        <Skeleton times={14} />
      </div>
    );
  };

  const Filter = () => {
    if (!playlist.tracks) {
      return (
        <div className={chartListStyles.err}>
          Network error, please check your connection
        </div>
      );
    } else {
      return <PlaylistTable tracks={playlist} userSetTrack={userSetTrack} />;
    }
  };

  return (
    <Container className={chartListStyles.tableConatiner}>
      <div style={{ position: "relative" }}>
        <Div>{!isFetching ? <Filter /> : <SkeletonContainer />}</Div>
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return { charts: state.playlist };
};

const mapDispatchToProps = dispatch => {
  return {
    playlist: id => dispatch(fetchPlaylist(id)),
    reset: () => dispatch({ type: "RESET_INDEX" }),
    userSetTrack: index => dispatch({ type: "USER_SET_TRACK", index: index })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsList);
