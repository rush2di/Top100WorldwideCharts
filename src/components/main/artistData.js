import React from "react";
import artistStyles from "./artist.module.scss";
import ArtistTracks from "./artistTracks";
import posed from "react-pose";

const Container = posed.div({
  hidden: {
    opacity: 0,
  },
  visible: {
    staggerChildren: 500,
    delay: 100,
    beforeChildren: true,
    withParent: false,
  },
});

const Head = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
});

const Table = posed.div({
  enter: { y: 0, opacity: 1, withParent: true },
  exit: { y: 50, opacity: 0 },
});

const ArtistData = (props) => {
  const { payload, isFetching } = props.artistInfo;
  return (
    <Container
      pose={isFetching === true ? "visible" : "visible"}
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
  );
};

export default ArtistData;
