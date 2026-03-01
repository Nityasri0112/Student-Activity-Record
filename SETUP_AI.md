# AI Chatbot Setup Guide

## Option 1: Google Gemini API (Recommended - FREE)

### Step 1: Get API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key

### Step 2: Add to Project
1. Open `.env` file in project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### Step 3: Restart Server
```bash
npm run dev
```

### Features:
- ✅ FREE tier: 60 requests per minute
- ✅ Natural language understanding
- ✅ Context-aware responses
- ✅ No credit card required

---

## Option 2: OpenAI API (ChatGPT)

### Step 1: Get API Key
1. Go to https://platform.openai.com/api-keys
2. Create account and add payment method
3. Create new API key

### Step 2: Install Package
```bash
npm install openai
```

### Step 3: Update aiService.js
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getAIResponse = async (userMessage) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a career coach for students." },
      { role: "user", content: userMessage }
    ],
    max_tokens: 150
  });
  
  return response.choices[0].message.content;
};
```

### Cost:
- GPT-3.5-turbo: $0.002 per 1K tokens (~$0.01 per conversation)
- GPT-4: $0.03 per 1K tokens

---

## Option 3: Keep Keyword-Based (Current)

If you don't add an API key, the chatbot will continue using the keyword-based responses (works offline, free, instant).

---

## Testing

After setup, test with questions like:
- "What skills should I learn for web development?"
- "How do I prepare for technical interviews?"
- "Suggest some project ideas for my portfolio"

The AI will provide personalized, intelligent responses!

---

## Troubleshooting

**Error: API key not found**
- Make sure `.env` file is in project root
- Restart dev server after adding key

**Error: Rate limit exceeded**
- Gemini free tier: 60 requests/minute
- Wait a minute and try again

**Error: Invalid API key**
- Check if key is correct
- Regenerate key if needed
