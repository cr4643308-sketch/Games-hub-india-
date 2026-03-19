import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
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

      // Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: 'cr4643308@gmail.com',
        subject: `[New Application] Games Hub India - User: ${ign}`,
        text: `
New Application Beta Submission

IGN: ${ign}
Age: ${ageGroup}
Playtime: ${playtime}
Why join: ${motivation}
Real Name: ${realName}
YouTuber Status: ${isYouTuber}
YT Stats (30 subs/500 views): ${hasStats}
Channel Link: ${channelInfo}
Discord Status: ${communityCheck}
PvP Tier: ${pvpTier}
        `
      };

      if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.warn("SMTP credentials not configured. Simulating email send.");
        console.log(mailOptions.text);
        return res.status(200).json({ success: true, message: "Application submitted (simulated)." });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Application submitted successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to submit application." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
