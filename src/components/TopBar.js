"use client";
import styles from './TopBar.module.css';
import { UserButton, useUser } from '@clerk/nextjs';
import { Bell, Users, Waves } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TopBar() {
  const { user, isLoaded } = useUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Fallback values if Clerk is loading or no user is signed in
  const displayName = isLoaded && user ? user.firstName || user.fullName : "Guest";

  return (
    <header className={styles.topBar}>
      <div className={styles.userInfo}>
        {/* Render Clerk's interactive UserButton */}
        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              avatarBox: styles.avatar
            }
          }}
        />
        <div style={{ marginLeft: '8px' }}>
          <p className={styles.greeting}>{greeting},</p>
          <h1 className={styles.name}>{displayName}</h1>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href="/society" className={styles.iconBtn}>
          <Users size={24} />
        </Link>
        <Link href="/blend" className={styles.iconBtn}>
          <Waves size={24} />
        </Link>
        <button className={styles.iconBtn}>
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
}
