import express from "express";
import cors from "cors";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Backend (Server-side) code to bypass 405 error
  app.post('/api/apply', async (req, res) => {
    try {
      const response = await axios.post('https://discord.com/api/webhooks/1484087273682112612/0VC_gUyAcbtaHS3Q6CQda_IBYJcV4gdfsF0VDw2ttCaTrB3ml2rX8lLtGJblueEiO2cx', req.body);
      res.status(200).send("Success!");
    } catch (err) {
      res.status(500).send("Error forwarding to Discord");
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
