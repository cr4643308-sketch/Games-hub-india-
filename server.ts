import express from "express";
import cors from "cors";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/application", async (req, res) => {
    try {
      const { 
        ign, 
        ageGroup, 
        playtime, 
        motivation, 
        realName, 
        isYouTuber, 
        hasStats, 
        channelInfo, 
        communityCheck, 
        pvpTier 
      } = req.body;

      // Validate required fields
      if (!ign || !ageGroup || !playtime || !motivation || !realName || !isYouTuber || !hasStats || !channelInfo || !communityCheck || !pvpTier) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const webhookUrl = "https://discord.com/api/webhooks/1484087273682112612/0VC_gUyAcbtaHS3Q6CQda_IBYJcV4gdfsF0VDw2ttCaTrB3ml2rX8lLtGJblueEiO2cx";

      const embed = {
        title: "New Beta Application",
        color: 8388736, // #800080 (Purple)
        fields: [
          { name: "**In-Game Name (IGN):**", value: ign, inline: true },
          { name: "**Age Group:**", value: ageGroup, inline: true },
          { name: "**Daily Playtime:**", value: playtime, inline: true },
          { name: "**Real Name:**", value: realName, inline: true },
          { name: "**Are you a YouTuber?:**", value: isYouTuber, inline: true },
          { name: "**Has Stats (30+ subs, 500+ views):**", value: hasStats, inline: true },
          { name: "**Channel Name & Link:**", value: channelInfo, inline: false },
          { name: "**Community Check:**", value: communityCheck, inline: true },
          { name: "**PvP Tier:**", value: pvpTier, inline: true },
          { name: "**Why do you want to play in our server?:**", value: motivation.substring(0, 1024), inline: false }
        ],
        timestamp: new Date().toISOString()
      };

      const discordRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });

      if (!discordRes.ok) {
        throw new Error(`Discord API responded with ${discordRes.status}`);
      }

      res.status(200).json({ success: true, message: "Application submitted successfully." });
    } catch (error) {
      console.error("Error sending to Discord:", error);
      res.status(500).json({ error: "Failed to submit application to Discord." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
