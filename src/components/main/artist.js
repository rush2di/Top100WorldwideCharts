import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchArtist } from "../store/actions/artistAction";
import artistStyles from "./artist.module.scss";
import ArtistTracks from "./artistTracks";
import posed from "react-pose";

const Container = posed.div({
  hidden: {
    opacity: 0
  },
  visible: {
    staggerChildren: 100,
    delay: 300,
    beforeChildren: true
  }
});

const Head = posed.div({
  enter: { y: 0, opacity: 1, withParent: true },
  exit: { y: -50, opacity: 0 }
});

const Table = posed.div({
  enter: { y: 0, opacity: 1, withParent: true },
  exit: { y: 50, opacity: 0 }
});

const Artist = props => {
  const { payload, isFetching } = props.artistInfo;
  useEffect(() => {
    const { params } = props.match;
    const { id } = props.artistInfo.payload;
    if (id != params.id) {
      return props.artist(params.id);
    }
    return undefined;
  }, []);

  console.log(props);

  return (
    props.artistInfo.isFetching === false && (
      <Container
        pose={isFetching === true ? "hidden" : "visible"}
        className={artistStyles.container}
      >
        <Head className={artistStyles.artistInfo}>
          <img src={payload.picture_medium} />
          <h3>{payload.name}</h3>
          <span>{`${payload.nb_album} albums`}</span>
        </Head>
        <Table className={artistStyles.tableContainer}>
          <ArtistTracks artistTracks={props.artistInfo.artistTracks} />
        </Table>
      </Container>
    )
  );
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
