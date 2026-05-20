"use client";
import { useAudio } from "@/contexts/AudioContext";
import { Play, Pause } from "@phosphor-icons/react";
import styles from "./MiniPlayer.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const pathname = usePathname();

  if (!currentTrack || pathname === "/player") return null;

  return (
    <div className={`glass ${styles.miniPlayer}`}>
      <Link href="/player" className={styles.trackInfo}>
        <img src={currentTrack.cover} alt="Cover" className={styles.cover} />
        <div className={styles.textInfo}>
          <span className={styles.title}>{currentTrack.title}</span>
          <span className={styles.artist}>{currentTrack.artist}</span>
        </div>
      </Link>
      <button className={styles.playBtn} onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePlay(); }}>
        {isPlaying ? <Pause size={24} weight="fill" /> : <Play size={24} weight="fill" />}
      </button>
    </div>
  );
}
