import React from "react";
import { getUrls } from "./storage";

function Statistics() {
  const data = getUrls();

  return (
    <div>
      <h2>Shortened URL History</h2>
      {data.length === 0 ? <p>No URLs found</p> :
        data.map((item, i) => (
          <div key={i}>
            <p>Original: {item.url}</p>
            <p>Shortened: <a href={item.shortUrl}>{item.shortUrl}</a></p>
            <p>Expires: {item.expiry}</p>
            <hr />
          </div>
        ))
      }
    </div>
  );
}

export default Statistics;
