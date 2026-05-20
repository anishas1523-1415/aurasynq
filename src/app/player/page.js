"use client";
import { useState, useEffect, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";
import styles from "./page.module.css";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react";

export default function Player() {
  const { currentTrack, isPlaying, isBuffering, togglePlay, progress, duration, seekTo, playNext, playPrevious } = useAudio();
  const [showLyrics, setShowLyrics] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("next");
  const lastClickTime = useRef(0);
  const activeLineRef = useRef(null);

  // Motion values to track drag offset and drive rotation/badge opacities dynamically
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const skipOpacity = useTransform(x, [-120, -20], [1, 0]);
  const prevOpacity = useTransform(x, [20, 120], [0, 1]);

  // Reset x motion position whenever the song changes
  useEffect(() => {
    x.set(0);
  }, [currentTrack?.id, x]);

  // Find the active lyric line based on progress
  const activeLyricIndex = currentTrack?.lyrics ? currentTrack.lyrics.findIndex((l, i, arr) => {
    const nextLine = arr[i + 1];
    return progress >= l.time && (!nextLine || progress < nextLine.time);
  }) : -1;

  useEffect(() => {
    if (currentTrack) {
      document.documentElement.style.setProperty('--aura-hue', currentTrack.hue);
    }
  }, [currentTrack]);

  // Automatically scroll active lyric line to center
  useEffect(() => {
    if (showLyrics && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [activeLyricIndex, showLyrics]);

  if (!currentTrack) {
    return <div className={styles.container}><h1 className={styles.empty}>Select a track from the Bubbles to begin</h1></div>;
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTap = (e) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime.current;
    
    if (timeDiff < 300) {
      console.log("AuraSynq Debug: Double tap detected, toggling lyrics");
      setShowLyrics(prev => !prev);
    } else {
      console.log("AuraSynq Debug: Single tap detected, toggling play");
      togglePlay();
    }
    lastClickTime.current = now;
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80;
    const velocityThreshold = 400;
    const dragDistance = info.offset.x;
    const dragVelocity = info.velocity.x;

    if (dragDistance < -swipeThreshold || dragVelocity < -velocityThreshold) {
      setSwipeDirection("next");
      playNext();
    } else if (dragDistance > swipeThreshold || dragVelocity > velocityThreshold) {
      setSwipeDirection("prev");
      playPrevious();
    } else {
      // Smoothly snap back to center using spring physics
      animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
    }
  };

  const handleBtnPrev = (e) => {
    e.stopPropagation();
    setSwipeDirection("prev");
    playPrevious();
  };

  const handleBtnNext = (e) => {
    e.stopPropagation();
    setSwipeDirection("next");
    playNext();
  };

  const percent = duration ? (progress / duration) * 100 : 0;

  const cardVariants = {
    enter: (dir) => ({
      x: dir === "next" ? 300 : dir === "prev" ? -300 : 0,
      rotate: dir === "next" ? 15 : dir === "prev" ? -15 : 0,
      opacity: 0,
      scale: 0.92
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        rotate: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (dir) => ({
      x: dir === "next" ? -400 : dir === "prev" ? 400 : 0,
      rotate: dir === "next" ? -25 : dir === "prev" ? 25 : 0,
      opacity: 0,
      scale: 0.92,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.background} ${isPlaying ? styles.pulse : ''}`}></div>
      
      {!showLyrics ? (
        <div className={styles.cardWrapper}>
          <AnimatePresence initial={false} custom={swipeDirection} mode="popLayout">
            <motion.div 
              key={currentTrack.id}
              custom={swipeDirection}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.minimalPlayer}
              drag="x"
              dragConstraints={{ left: -400, right: 400 }}
              onDragEnd={handleDragEnd}
              style={{ x, rotate }}
              onTap={handleTap}
            >
              {/* Tinder-style SKIP and PREV visual stamp overlays */}
              <motion.div className={styles.skipBadge} style={{ opacity: skipOpacity }}>
                <span>SKIP</span>
              </motion.div>
              <motion.div className={styles.prevBadge} style={{ opacity: prevOpacity }}>
                <span>PREV</span>
              </motion.div>

              <div className={styles.coverContainer} onClick={(e) => e.stopPropagation()}>
                <img 
                  src={currentTrack.cover} 
                  alt="Cover" 
                  className={`${styles.cover} ${isBuffering ? styles.loadingCover : ''}`} 
                />
                {isBuffering && (
                  <div className={styles.loaderOverlay}>
                    <div className={styles.spinner}></div>
                    <span>Streaming...</span>
                  </div>
                )}
              </div>
              
              <div className={styles.info}>
                <h1>{currentTrack.title}</h1>
                <p>{currentTrack.artist}</p>
              </div>

              {/* Seek Slider */}
              <div 
                className={styles.sliderContainer} 
                onClick={(e) => e.stopPropagation()} 
                onDoubleClick={(e) => e.stopPropagation()}
              >
                <span className={styles.timeText}>{formatTime(progress)}</span>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className={styles.seekBar}
                  style={{
                    background: `linear-gradient(to right, var(--primary-color, #a855f7) ${percent}%, rgba(255, 255, 255, 0.2) ${percent}%)`
                  }}
                />
                <span className={styles.timeText}>{formatTime(duration)}</span>
              </div>

              <p className={styles.hint}>Swipe left/right to change • Double tap for lyrics</p>
            </motion.div>
          </AnimatePresence>

          {/* Tinder Action Buttons */}
          <div className={styles.tinderActions}>
            <button 
              className={styles.actionBtnPrev} 
              onClick={handleBtnPrev}
              title="Previous Song"
            >
              <SkipBack size={22} weight="fill" />
            </button>
            
            <button 
              className={styles.actionBtnPlay} 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={26} weight="fill" /> : <Play size={26} weight="fill" />}
            </button>
            
            <button 
              className={styles.actionBtnNext} 
              onClick={handleBtnNext}
              title="Next Song"
            >
              <SkipForward size={22} weight="fill" />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.lyricsView} onClick={handleTap}>
          <div className={styles.waterfall}>
            {currentTrack.lyrics?.map((line, i) => {
              const isActive = i === activeLyricIndex;
              const isPast = i < activeLyricIndex;
              return (
                <div 
                  key={i} 
                  ref={isActive ? activeLineRef : null}
                  className={`${styles.lyricLine} ${isActive ? styles.lyricActive : ''} ${isPast ? styles.lyricPast : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    seekTo(line.time);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
