import crypto from 'node:crypto';

const messages = [];

export async function handler(event) {
  if (event.httpMethod === 'GET') {
    return json(200, { messages });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' }, { Allow: 'GET, POST' });
  }

  const body = event.body ? JSON.parse(event.body) : {};
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json(400, { error: 'Name, email, and message are required.' });
  }

  const contactMessage = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  messages.unshift(contactMessage);

  return json(201, { message: contactMessage });
}

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };
}
