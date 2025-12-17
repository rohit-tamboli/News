import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (q = "general") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://news-rbrl.vercel.app/api/news?q=${q}`
      );
      const data = await res.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="app">
      <h1>📰 News Portal</h1>

      <div className="search">
        <input
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => fetchNews(search || "general")}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="news-list">
        {news.map((item, i) => (
          <div key={i} className="card">
            <img
              src={item.urlToImage || "https://via.placeholder.com/300"}
              alt="news"
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
