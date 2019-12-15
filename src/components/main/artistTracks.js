import React from "react";

const ArtistTracks = ({ artistTracks }) => {
  const tracksInfo = artistTracks.map((track, index) => {
    return (
      <tr key={track.id}>
        <th>{index + 1}</th>
        <td>{track.title}</td>
        <td>{track.album.title}</td>
      </tr>
    );
  });
  return (
    <table className="table table-condensed">
      <tbody>{tracksInfo}</tbody>
    </table>
  );
};

export default ArtistTracks;
