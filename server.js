import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const dataDir = path.resolve('data');
const messagesFile = path.join(dataDir, 'messages.json');

app.use(express.json());

async function readMessages() {
  try {
    const file = await fs.readFile(messagesFile, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

async function writeMessages(messages) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
}

async function writeLog(message) {
  await fs.appendFile(path.resolve('server.log'), `${new Date().toISOString()} ${message}\n`);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'melody-api' });
});

app.get('/api/messages', async (_req, res, next) => {
  try {
    const messages = await readMessages();
    res.json({ messages });
  } catch (error) {
    next(error);
  }
});

app.post('/api/messages', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const contactMessage = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const messages = await readMessages();
    messages.unshift(contactMessage);
    await writeMessages(messages);

    res.status(201).json({ message: contactMessage });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  void writeLog(error.stack ?? error.message);
  res.status(500).json({ error: 'Something went wrong.' });
});

app.listen(port, () => {
  void writeLog(`Melody API listening on http://localhost:${port}`);
});
