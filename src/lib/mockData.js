export const currentUser = {
  id: "u1",
  name: "User",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  premium: false
};

export const categories = [
  { id: "c1", name: "Chill", color: "#8A2BE2" },
  { id: "c2", name: "Focus", color: "#2E8B57" },
  { id: "c3", name: "Workout", color: "#FF4500" },
  { id: "c4", name: "Sleep", color: "#483D8B" },
];

export const trendingTracks = [
  {
    id: "t1",
    title: "Fade",
    artist: "Alan Walker",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80",
    url: "https://www.youtube.com/watch?v=bM7SZ5SBzyY",
    mood: "energetic",
    hue: 300,
    djIntro: "You are tuned into Aura. Let's get things moving with an absolute classic from Alan Walker.",
    lyrics: [
      { time: 5, text: "Wait for the drop..." },
      { time: 10, text: "You were the shadow to my light" },
      { time: 14, text: "Did you feel us?" },
      { time: 18, text: "Another start" },
      { time: 22, text: "You fade away" }
    ]
  },
  {
    id: "t2",
    title: "On & On",
    artist: "Cartoon",
    cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&w=300&q=80",
    url: "https://www.youtube.com/watch?v=K4DyBUG242c",
    mood: "chill",
    hue: 200,
    djIntro: "Time to chill out. Up next, Cartoon with On and On. Enjoy the vibes.",
    lyrics: [
      { time: 3, text: "(Intro)" },
      { time: 8, text: "I'll be there for you" },
      { time: 12, text: "When you need somebody" },
      { time: 16, text: "On and on and on" }
    ]
  },
  {
    id: "t3",
    title: "Invincible",
    artist: "DEAF KEV",
    cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=300&q=80",
    url: "https://www.youtube.com/watch?v=J2X5mJ3HDYE",
    mood: "upbeat",
    hue: 340
  }
];

export const societies = [
  {
    id: "s1",
    name: "Lofi Study Session",
    activeUsers: 142,
    currentTrack: "t2"
  },
  {
    id: "s2",
    name: "Global Top 50 Party",
    activeUsers: 809,
    currentTrack: "t1"
  }
];
