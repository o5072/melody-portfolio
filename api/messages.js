import crypto from 'node:crypto';

const messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ messages });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = req.body ?? {};

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

  messages.unshift(contactMessage);

  return res.status(201).json({ message: contactMessage });
}
