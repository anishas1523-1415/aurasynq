"use client";
import styles from "./page.module.css";
import TopBar from "@/components/TopBar";
import Link from "next/link";

const HOME_BUBBLES = [
  { id: "chill",       name: "CHILL",    color: "#11998e", path: "/category/chill",    size: 130 },
  { id: "trending",    name: "TRENDING", color: "#ff0844", path: "/trends",             size: 145 },
  { id: "focus",       name: "FOCUS",    color: "#8e54e9", path: "/category/focus",    size: 120 },
  { id: "workout",     name: "WORKOUT",  color: "#ff4500", path: "/category/workout",  size: 135 },
  { id: "sleep",       name: "SLEEP",    color: "#4ca1af", path: "/category/sleep",    size: 115 },
  { id: "tamil",       name: "TAMIL",    color: "#f7971e", path: "/category/tamil",    size: 125 },
  { id: "electronic",  name: "ELECTRO",  color: "#b224ef", path: "/category/electronic", size: 118 },
];

// Distribute bubbles in a visually interesting pattern
const POSITIONS = [
  { top: "8%",  left: "12%" },
  { top: "6%",  left: "55%" },
  { top: "24%", left: "35%" },
  { top: "38%", left: "8%"  },
  { top: "40%", left: "55%" },
  { top: "58%", left: "20%" },
  { top: "60%", left: "55%" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.spatialMap}>
        {HOME_BUBBLES.map((bubble, i) => {
          const pos = POSITIONS[i] || { top: `${10 + i * 12}%`, left: `${i % 2 === 0 ? 15 : 50}%` };
          return (
            <Link
              key={bubble.id}
              href={bubble.path}
              style={{ position: "absolute", top: pos.top, left: pos.left, textDecoration: "none" }}
            >
              <div
                className={styles.bubble}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  "--bubble-color": bubble.color,
                  animationDelay: `${i * 1.2}s`,
                }}
              >
                <span>{bubble.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
