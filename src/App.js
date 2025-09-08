import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const handleShorten = async () => {
    if (!url) return;
    try {
      const res = await fetch("http://localhost:8080/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const data = await res.json();
        setShortUrls([...shortUrls, data]);
        setUrl("");
      } else {
        alert("Error shortening URL");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>URL Shortener</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "70%", padding: "0.5rem" }}
        />
        <button
          onClick={handleShorten}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          Shorten
        </button>
      </div>
      <ul>
        {shortUrls.map((s, idx) => (
          <li key={idx}>
            <a href={s.shortUrl} target="_blank" rel="noreferrer">
              {s.shortUrl}
            </a>{" "}
            → {s.url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;