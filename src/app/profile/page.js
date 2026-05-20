"use client";
import styles from "./page.module.css";
import { ChartBar, Gear, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function Profile() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className={styles.avatar} />
        <h1>Cyber Ninja</h1>
        <p>Premium Member</p>
      </header>

      <section className={styles.auraSection}>
        <h2>Your Current Aura</h2>
        <div className={styles.auraOrb}>
          <div className={styles.orbCore}></div>
        </div>
        <p>You've been listening to <strong>Electronic & Synthwave</strong> lately.</p>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <ChartBar size={24} color="var(--primary-color)"/>
          <div>
            <h3>1,420</h3>
            <p>Minutes Listened</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <Gear size={24} color="var(--primary-color)"/>
          <div>
            <h3>Manage Data</h3>
            <p>Privacy & Settings</p>
          </div>
        </div>
      </section>

      <section className={styles.history}>
        <div className={styles.historyHeader}>
          <h2>Recent History</h2>
          <ArrowRight size={20} />
        </div>
        <div className={styles.historyList}>
          {["Cyberpunk Mix", "Alan Walker", "Neon Pulse", "Workout Grind"].map((name, i) => (
             <div key={i} className={styles.historyItem}>{name}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
