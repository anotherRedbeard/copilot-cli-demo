import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

const {
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_VERSION,
  AZURE_OPENAI_MODEL,
  PORT = '3001'
} = process.env;

function getAzureToken() {
  const result = execSync(
    'az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv',
    { encoding: 'utf-8' }
  );
  return result.trim();
}

let cachedToken = null;
let tokenExpiry = 0;

function getToken() {
  const now = Date.now();
  if (!cachedToken || now >= tokenExpiry) {
    cachedToken = getAzureToken();
    // Cache for 5 minutes (tokens last ~60 min)
    tokenExpiry = now + 5 * 60 * 1000;
  }
  return cachedToken;
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_MODEL}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

  try {
    const token = getToken();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        messages,
        max_completion_tokens: 200,
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
  } catch (e) {
    console.error('Request error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Chatbot running at http://localhost:${PORT}`);
});
