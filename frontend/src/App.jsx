import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNews = async (q = "general") => {
    const res = await fetch(
      `https://news-backend.vercel.app/api/news?q=${query}`
    );

    const data = await res.json();
    setNews(data.articles || []);
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
        <button onClick={() => fetchNews(search)}>Search</button>
      </div>

      <div className="news-list">
        {news.map((item, i) => (
          <div key={i} className="card">
            <img src={item.urlToImage} alt="" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
