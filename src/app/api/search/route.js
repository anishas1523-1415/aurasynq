import { NextResponse } from 'next/server';
const ytSearch = require('youtube-search-api');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // Use local scraper (youtube-search-api) directly for near-instant results
    const results = await ytSearch.GetListByKeyword(query, false, 15, [{type: 'video'}]);
    
    if (!results || !results.items) {
      return NextResponse.json({ tracks: [] });
    }

    const tracks = results.items.map(item => ({
      id: item.id,
      title: item.title,
      artist: item.channelTitle || 'Unknown Artist',
      cover: item.thumbnail?.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      mood: "energetic",
      hue: Math.floor(Math.random() * 360)
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}
