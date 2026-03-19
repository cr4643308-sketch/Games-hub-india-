import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1484087273682112612/0VC_gUyAcbtaHS3Q6CQda_IBYJcV4gdfsF0VDw2ttCaTrB3ml2rX8lLtGJblueEiO2cx';
    
    await axios.post(discordWebhookUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.error('Discord Webhook Error:', err);
    res.status(500).json({ error: 'Error forwarding to Discord' });
  }
}
