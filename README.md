<div align="center">
</div>

# Melody Portfolio

This contains the Melody portfolio frontend and a small local backend API for receiving contact form submissions.

View your app in AI Studio: https://ai.studio/apps/fc12307d-4fd2-4e01-b1bf-fda82dae4ba1

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the backend API:
   `npm run server`
3. In a second terminal, run the frontend:
   `npm run dev`

The frontend runs on `http://localhost:3000` and proxies `/api` requests to the backend on `http://localhost:3001`.

Contact messages are stored locally in `data/messages.json`.

On Vercel, `/api/health` and `/api/messages` are served by serverless functions in `api/`. For durable production message storage, connect a database or Vercel storage product before relying on contact messages long-term.
