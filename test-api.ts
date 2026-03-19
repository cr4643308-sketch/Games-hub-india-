async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/health');
    const text = await res.text();
    console.log('Health status:', res.status, text);
    
    const res2 = await fetch('http://localhost:3000/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ign: 'test', ageGroup: '18+', playtime: '1HR+', motivation: 'test',
        realName: 'test', isYouTuber: 'No', hasStats: 'No', channelInfo: 'test',
        communityCheck: 'Yes', pvpTier: 'Low Tier'
      })
    });
    const text2 = await res2.text();
    console.log('App status:', res2.status, text2);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
test();
