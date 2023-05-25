import React from 'react'

import Blog from "./Blog/Blog";

function HomeFinal({ data, currentPage }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Blog data={data} pageTrack={currentPage} />
    </div>
  );
}

export default HomeFinal