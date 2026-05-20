"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { Play, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Trends() {
  const { playTrack } = useAudio();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTamilSongs() {
      try {
        const res = await fetch('/api/search?q=latest+tamil+hit+songs');
        const data = await res.json();
        
        const testTrack = {
          id: "test-mp3",
          title: "🔊 [TEST PLAYER] Click here to test direct audio",
          artist: "System MP3 Player Test",
          cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          mood: "chill",
          hue: 200
        };

        if (data.tracks) {
          setTracks([testTrack, ...data.tracks.slice(0, 14)]);
        } else {
          setTracks([testTrack]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchTamilSongs();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={24} />
        </Link>
        <h1>Tamil Trends</h1>
        <p>Floating hits from YouTube</p>
      </header>

      <div className={styles.spatialMap}>
        {loading && (
          <div className={styles.loader}>
            Syncing Live Tamil Tracks...
          </div>
        )}
        
        {tracks.map((track, i) => {
          // Generate semi-random placement
          const size = 95 + (i % 3) * 15;
          const top = 10 + (i * 6.5) + '%';
          const left = (i % 2 === 0 ? 15 + (i % 4) * 8 : 50 - (i % 3) * 8) + '%';
          
          return (
             <div 
              key={track.id} 
              className={styles.trackBubble} 
              style={{ 
                width: size, 
                height: size, 
                top, 
                left, 
                backgroundImage: `url(${track.cover})`,
                animationDelay: `${i * 0.15}s`
              }}
              onClick={() => playTrack(track, tracks)}
            >
              <div className={styles.playOverlay}>
                <Play size={24} weight="fill" color="white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
