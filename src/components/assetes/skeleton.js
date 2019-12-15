import React from "react";

const Skeleton = ({ times }) => {
  return [...Array(times)].map((e, i) => <div key={i} className="bg m5" />);
};

export default Skeleton;
