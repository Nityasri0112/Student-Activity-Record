// AI Service using Google Gemini API (Free)

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const getAIResponse = async (userMessage, conversationHistory = []) => {
  // Fallback to keyword-based responses if no API key
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    return getKeywordResponse(userMessage);
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a career coach AI assistant for college students. Provide helpful, concise advice about careers, skills, courses, interviews, and job preparation. Keep responses under 150 words.

User question: ${userMessage}`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response from API');
  } catch (error) {
    console.error('AI API Error:', error);
    return getKeywordResponse(userMessage);
  }
};

// Fallback keyword-based responses
const getKeywordResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('skill') || msg.includes('learn')) {
    if (msg.includes('web')) return "For web development: React.js, HTML5, CSS3, JavaScript, Tailwind CSS. Start with basics then move to frameworks.";
    if (msg.includes('backend')) return "For backend: Node.js, Express.js, Python, databases (MongoDB, PostgreSQL), REST APIs.";
    if (msg.includes('data')) return "For data science: Python, Pandas, SQL, Machine Learning, Data Visualization.";
    return "Popular skills: Full-Stack Development, Cloud Computing (AWS), AI/ML, DevOps, Cybersecurity.";
  }
  
  if (msg.includes('course') || msg.includes('certification')) {
    return "Top platforms: Coursera, Udemy, edX, Pluralsight. For free: freeCodeCamp, YouTube.";
  }
  
  if (msg.includes('interview')) {
    return "Interview prep: Practice coding (LeetCode), study system design, review projects, prepare behavioral questions (STAR method).";
  }
  
  if (msg.includes('resume') || msg.includes('portfolio')) {
    return "Resume tips: Highlight projects, quantify achievements, include certifications, keep it 1-2 pages, use action verbs.";
  }
  
  if (msg.includes('salary')) {
    return "Average fresher salaries: Software Engineer (4-8 LPA), Data Analyst (3-6 LPA), Full-Stack (5-10 LPA).";
  }
  
  return "I can help with: skills, courses, career planning, interviews, resume tips, salary info. What would you like to know?";
};
