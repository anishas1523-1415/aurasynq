"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Blend() {
  const [isBlending, setIsBlending] = useState(false);
  const [blended, setBlended] = useState(false);

  useEffect(() => {
    if (isBlending) {
      setTimeout(() => {
        setIsBlending(false);
        setBlended(true);
      }, 4000);
    }
  }, [isBlending]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Aura Blend</h1>
        <p>Merge your musical soul with a friend</p>
      </header>
      
      <div className={styles.blendStage}>
        <div className={`${styles.blob} ${styles.myBlob} ${isBlending || blended ? styles.blobMerge : ''}`}>
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className={styles.blobAvatar} />
        </div>
        <div className={`${styles.blob} ${styles.friendBlob} ${isBlending || blended ? styles.blobMerge : ''}`}>
           <img src="https://i.pravatar.cc/150?u=2" className={styles.blobAvatar} />
        </div>
      </div>

      <div className={styles.controls}>
        {!isBlending && !blended && (
          <button className={styles.blendBtn} onClick={() => setIsBlending(true)}>
            Start Blend
          </button>
        )}
        {isBlending && <p className={styles.status}>Synchronizing Auras...</p>}
        {blended && (
          <div className={styles.result}>
            <h2>94% Match!</h2>
            <button className={styles.blendBtn}>Play Blended Playlist</button>
          </div>
        )}
      </div>
    </div>
  );
}
