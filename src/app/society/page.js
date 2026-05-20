"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { Users } from "@phosphor-icons/react/dist/ssr";

export default function Society() {
  const [particles, setParticles] = useState([]);
  
  const handleCanvasTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = { id: Date.now(), x, y };
    setParticles(prev => [...prev, newParticle]);
    
    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Live Society</h1>
        <p>You are listening with 3 friends in "Cyberpunk Room"</p>
        <div className={styles.avatars}>
          <img src="https://i.pravatar.cc/150?u=1" className={styles.avatar} />
          <img src="https://i.pravatar.cc/150?u=2" className={styles.avatar} />
          <img src="https://i.pravatar.cc/150?u=3" className={styles.avatar} />
        </div>
      </header>
      
      <div className={styles.canvasContainer} onClick={handleCanvasTap}>
        <div className={styles.canvasHint}>
          <Users size={32} />
          <p>Tap the screen to the beat to send ripples to your friends!</p>
        </div>
        
        {particles.map(p => (
          <div 
            key={p.id} 
            className={styles.particle} 
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </div>
    </div>
  );
}
