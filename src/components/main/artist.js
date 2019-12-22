import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchArtist } from "../store/actions/artistAction";
import ArtistData from "./artistData";

const Artist = props => {
  useEffect(() => {
    const { params } = props.match;
    const { id } = props.artistInfo.payload;
    if (id != params.id) {
      return props.artist(params.id);
    }
    return undefined;
  }, []);

  return props.artistInfo.isFetching === false ? (
    <ArtistData {...props} />
  ) : null;
};

const mapStateToProps = state => {
  return { artistInfo: state.artist };
};

const mapDispatchToProps = dispatch => {
  return {
    artist: id => dispatch(fetchArtist(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
