import React from "react";
import { Link } from "react-router-dom";
import "./tables.scss";
import posed, { PoseGroup } from "react-pose";

const Section = posed.tr({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const PlaylistTable = ({ tracks, userSetTrack }) => {
  const tracksInfo = tracks.tracks.data.map((track, index) => {
    return (
      <Section key={track.id}>
        <th>{index + 1}</th>
        <td onClick={() => userSetTrack(index)}>{track.title}</td>
        <td>
          <Link to={{ pathname: `/artist/${track.artist.id}` }}>
            {track.artist.name}
          </Link>
        </td>
        <td onClick={() => userSetTrack(index)}>{track.album.title}</td>
      </Section>
    );
  });
  return (
    tracks && (
      <table
        style={{ marginTop: -1 }}
        className="table table-condensed mobile-table"
      >
        <tbody>
          <PoseGroup animateOnMount={false}>{tracksInfo}</PoseGroup>
        </tbody>
      </table>
    )
  );
};

export default PlaylistTable;
