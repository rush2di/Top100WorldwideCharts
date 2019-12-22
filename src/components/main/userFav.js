import React from "react";
import { connect } from "react-redux";
import favStyles from "./userFav.module.scss";
import posed from "react-pose";

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const Box = posed.div({
  enter: { x: 0, opacity: 1, withParent: true },
  exit: { x: -50, opacity: 0 }
});

const UserFavs = props => {
  const { likedTracks, username } = props.statut;
  const style = { textAlign: "center", margin: "2em" };
  const table = likedTracks.map((track, index) => {
    return (
      <tr key={track.id}>
        <th>{index + 1}</th>
        <td>{track.title}</td>
        <td>by: {track.artist}</td>
      </tr>
    );
  });
  return (
    props.secured === false &&
    (likedTracks.length > 0 ? (
      <div style={{ marginTop: "2em" }}>
        <Container>
          <Box className={favStyles.header}>{username} saved tracks</Box>
          <div className={favStyles.tableWrapper}>
            <table className={(favStyles.table, "table")}>
              <tbody>{table}</tbody>
            </table>
          </div>
        </Container>
      </div>
    ) : (
      <div style={style}>Opps ! You have no saved tracks yet</div>
    ))
  );
};

const mapStateToProps = state => {
  return { statut: state.statut };
};

export default connect(mapStateToProps)(UserFavs);
