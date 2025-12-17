import { useEffect, useState } from "react";
import "./App.css";

const topics = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
];

export default function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("general");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (q = topic) => {
    setLoading(true);
    try {
      const res = await fetch(`https://news-rbrl.vercel.app/api/news?q=${q}`);
      const data = await res.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(topic);
  }, [topic]);

  return (
    <div className="app">
      <h1>📰 News Portal</h1>

      {/* 🔹 Search */}
      <div className="search">
        <input
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => fetchNews(search || topic)}>Search</button>
      </div>

      {/* 🔹 Topics */}
      <div className="topics">
        {topics.map((t) => (
          <button
            key={t}
            className={`topic-btn ${topic === t ? "active" : ""}`}
            onClick={() => {
              setTopic(t);
              setSearch("");
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading...</p>}

      {/* 🔹 News Cards */}
      <div className="news-list">
        {news.map(
          (item, i) =>
            item.urlToImage && (
              <div key={i} className="card">
                <img
                  src={item.urlToImage}
                  alt="news"
                  onError={(e) => {
                    e.currentTarget.closest(".card").style.display = "none";
                  }}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  Read More →
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
}
