"use client";
import styles from "./page.module.css";
import { MagnifyingGlass, Play } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";

export default function Search() {
  const { playTrack } = useAudio();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.tracks) {
          setResults(data.tracks);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const recentSearches = ["Alan Walker", "Lofi mix", "Workout playlist"];
  const genres = [
    { name: "Pop", gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", shadowColor: "rgba(255, 65, 108, 0.5)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&q=80" },
    { name: "Hip-Hop", gradient: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)", shadowColor: "rgba(142, 84, 233, 0.5)", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&q=80" },
    { name: "Indie", gradient: "linear-gradient(135deg, #FF8008 0%, #FFA081 100%)", shadowColor: "rgba(255, 128, 8, 0.5)", image: "https://images.unsplash.com/photo-1499557620251-51253457a3e7?w=150&q=80" },
    { name: "Chill", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", shadowColor: "rgba(56, 239, 125, 0.5)", image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=150&q=80" },
    { name: "Electronic", gradient: "linear-gradient(135deg, #b224ef 0%, #7579ff 100%)", shadowColor: "rgba(178, 36, 239, 0.5)", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=150&q=80" },
    { name: "Rock", gradient: "linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)", shadowColor: "rgba(233, 64, 87, 0.5)", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&q=80" }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Search</h1>
        <div className={styles.searchBar}>
          <MagnifyingGlass size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search Tamil songs..." 
            className={styles.searchInput} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </header>

      {loading && <p style={{textAlign: 'center', color: 'white'}}>Searching...</p>}
      
      {results.length > 0 && (
        <section className={styles.section}>
          <h2>Search Results</h2>
          <div className={styles.resultsList}>
            {results.map((track) => (
              <div key={track.id} className={styles.resultItem} onClick={() => playTrack(track, results)}>
                <img src={track.cover} alt={track.title} className={styles.resultCover} />
                <div className={styles.resultInfo}>
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </div>
                <Play size={24} className={styles.playIcon} />
              </div>
            ))}
          </div>
        </section>
      )}

      {results.length === 0 && (
        <>
          <section className={styles.section}>
        <h2>Recent Searches</h2>
        <div className={styles.recentList}>
          {recentSearches.map((search, i) => (
            <div key={i} className={`glass ${styles.recentItem}`}>
              <MagnifyingGlass size={16} />
              <span>{search}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Browse All</h2>
        <div className={styles.grid}>
          {genres.map(genre => (
            <div 
              key={genre.name} 
              className={styles.genreCard} 
              style={{ background: genre.gradient, '--shadow-color': genre.shadowColor }}
            >
              <h3>{genre.name}</h3>
              <img src={genre.image} alt={genre.name} className={styles.genreImg} />
            </div>
          ))}
        </div>
          </section>
        </>
      )}
    </div>
  );
}
