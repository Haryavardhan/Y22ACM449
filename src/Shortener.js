import React, { useState } from "react";
import { saveUrls, getUrls } from "./storage";
import { isValidURL, isPositiveInteger, isValidSlug, generateCode, isUnique, reserveCode } from "./utils";

function Shortener() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = () => {
    if (!isValidURL(url)) {
      setMessage("❌ Invalid URL");
      return;
    }
    if (validity && !isPositiveInteger(validity)) {
      setMessage("❌ Validity must be a positive number");
      return;
    }
    if (shortcode && (!isValidSlug(shortcode) || !isUnique(shortcode))) {
      setMessage("❌ Invalid or duplicate shortcode");
      return;
    }

    const code = shortcode || generateCode();
    reserveCode(code);
    const expiry = new Date(Date.now() + (validity ? +validity : 30) * 60000).toLocaleString();
    const shortUrl = `http://short.ly/${code}`;

    const newEntry = { url, shortUrl, expiry };
    const updated = [...getUrls(), newEntry];
    saveUrls(updated);
    setResult([newEntry]);
    setMessage("✅ Shortened successfully");
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <input placeholder="Long URL" value={url} onChange={e => setUrl(e.target.value)} /><br />
      <input placeholder="Validity (min)" value={validity} onChange={e => setValidity(e.target.value)} /><br />
      <input placeholder="Preferred Shortcode" value={shortcode} onChange={e => setShortcode(e.target.value)} /><br />
      <button onClick={handleSubmit}>Shorten</button>
      <p>{message}</p>
      {result.map((r, i) => (
        <div key={i}>
          <p>Original: {r.url}</p>
          <p>Shortened: <a href={r.shortUrl}>{r.shortUrl}</a></p>
          <p>Expires: {r.expiry}</p>
        </div>
      ))}
    </div>
  );
}

export default Shortener;
