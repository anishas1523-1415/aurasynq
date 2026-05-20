"use client";
import styles from "./page.module.css";
import { Heart, Plus } from "@phosphor-icons/react/dist/ssr";

export default function Library() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className={styles.thumb}/>
          <h1>Your Library</h1>
          <button className={styles.addBtn}><Plus size={24}/></button>
        </div>
        <div className={styles.filters}>
          <span className={styles.filterChip}>Playlists</span>
          <span className={styles.filterChip}>Artists</span>
          <span className={styles.filterChip}>Albums</span>
        </div>
      </header>

      <div className={styles.list}>
        <div className={styles.listItem}>
          <div className={styles.likedCover}>
            <Heart size={24} weight="fill" color="white"/>
          </div>
          <div className={styles.listText}>
            <h3>Liked Songs</h3>
            <p>128 songs</p>
          </div>
        </div>

        <div className={styles.listItem}>
          <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=100&q=80" className={styles.cover}/>
          <div className={styles.listText}>
            <h3>Cyberpunk Mix</h3>
            <p>Playlist • AuraSynq</p>
          </div>
        </div>
      </div>
    </div>
  );
}
