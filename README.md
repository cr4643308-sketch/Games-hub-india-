# XERDOX AI on GAMES HUB INDIA

This project is a specialized AI interface for 'XERDOX AI', hosted on 'GAMES HUB INDIA'.

## Vercel Deployment Instructions

To deploy this project to Vercel, follow these steps:

1.  **Push to GitHub**: Push your code to a GitHub repository.
2.  **Import to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository.
3.  **Configure Environment Variables**:
    *   In the Vercel project settings, go to **Environment Variables**.
    *   Add a new variable named `GEMINI_API_KEY`.
    *   Paste your Google Gemini API key as the value.
4.  **Deploy**: Click **Deploy**.

## Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Features

*   **XERDOX AI**: A high-performance academic and utility AI.
*   **WhatsApp-style UI**: Minimalist, text-only interface.
*   **LaTeX Support**: Renders complex mathematical problems perfectly.
*   **OCR Support**: Analyze images for study assistance.
