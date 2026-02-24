import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

const {
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_VERSION,
  AZURE_OPENAI_MODEL,
  AZURE_OPENAI_KEY,
  PORT = '3001'
} = process.env;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_MODEL}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': AZURE_OPENAI_KEY
    },
    body: JSON.stringify({
      messages,
      max_tokens: 200,
      temperature: 1,
      logprobs: true,
      top_logprobs: 3
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Azure OpenAI error:', response.status, err);
    return res.status(response.status).json({ error: err });
  }

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Chatbot running at http://localhost:${PORT}`);
});
