import React, { useState } from "react";
import { getAIResponse } from "../../services/aiService";

const getLocalResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Skills recommendations
  if (msg.includes('skill') || msg.includes('learn') || msg.includes('technology')) {
    if (msg.includes('web') || msg.includes('frontend')) {
      return "For web development, I recommend: React.js, Vue.js, HTML5, CSS3, JavaScript ES6+, and Tailwind CSS. Start with HTML/CSS basics, then move to JavaScript and React.";
    }
    if (msg.includes('backend') || msg.includes('server')) {
      return "For backend development, learn: Node.js, Express.js, Python (Django/Flask), databases (MongoDB, PostgreSQL), REST APIs, and authentication systems.";
    }
    if (msg.includes('data') || msg.includes('analytics')) {
      return "For data science: Python, Pandas, NumPy, SQL, Machine Learning (scikit-learn), Data Visualization (Matplotlib, Tableau), and Statistics.";
    }
    if (msg.includes('mobile') || msg.includes('app')) {
      return "For mobile development: React Native, Flutter, Swift (iOS), Kotlin (Android), Firebase, and mobile UI/UX principles.";
    }
    return "Popular in-demand skills: Cloud Computing (AWS, Azure), DevOps, AI/ML, Cybersecurity, Full-Stack Development, and Data Science. What area interests you?";
  }
  
  // Course recommendations
  if (msg.includes('course') || msg.includes('certification') || msg.includes('mooc')) {
    return "Top platforms: Coursera (Google/IBM certs), Udemy (practical courses), edX (university courses), Pluralsight (tech skills), LinkedIn Learning. For free: freeCodeCamp, YouTube, MDN Web Docs.";
  }
  
  // Career planning
  if (msg.includes('career') || msg.includes('job') || msg.includes('placement')) {
    return "Career tips: 1) Build a strong portfolio with 3-5 projects, 2) Contribute to open source, 3) Network on LinkedIn, 4) Practice DSA on LeetCode, 5) Prepare for interviews, 6) Keep learning new technologies.";
  }
  
  // Resume/Portfolio
  if (msg.includes('resume') || msg.includes('portfolio') || msg.includes('cv')) {
    return "Resume tips: Highlight projects with tech stack, quantify achievements (e.g., 'Improved performance by 40%'), include certifications, keep it 1-2 pages, use action verbs. Use our Resume Builder tool!";
  }
  
  // Interview preparation
  if (msg.includes('interview') || msg.includes('prepare')) {
    return "Interview prep: 1) Practice coding on LeetCode/HackerRank, 2) Study system design, 3) Review your projects deeply, 4) Prepare behavioral questions (STAR method), 5) Research the company, 6) Mock interviews with peers.";
  }
  
  // Internship
  if (msg.includes('internship')) {
    return "Finding internships: Check LinkedIn, Indeed, Internshala, company career pages. Apply early (Aug-Sept for summer). Tailor your resume for each application. Network with alumni. Build projects related to target companies.";
  }
  
  // Salary/Compensation
  if (msg.includes('salary') || msg.includes('pay') || msg.includes('compensation')) {
    return "Average fresher salaries in India: Software Engineer (4-8 LPA), Data Analyst (3-6 LPA), Full-Stack Dev (5-10 LPA). Top companies offer 10-40 LPA. Focus on skills over salary initially. Growth comes with experience.";
  }
  
  // Companies
  if (msg.includes('company') || msg.includes('companies')) {
    return "Top hiring companies: FAANG (Facebook, Amazon, Apple, Netflix, Google), Microsoft, Adobe, Flipkart, Swiggy, Zomato, startups. Each has different interview processes. Research their tech stack and culture.";
  }
  
  // Projects
  if (msg.includes('project') || msg.includes('build')) {
    return "Project ideas: E-commerce site, Chat app, Task manager, Weather app, Portfolio website, Blog platform, Social media clone. Use modern tech stack, deploy on Vercel/Netlify, add to GitHub with good README.";
  }
  
  // Default response
  return "I can help you with: skills to learn, course recommendations, career planning, resume tips, interview prep, internships, salary info, companies, and project ideas. What would you like to know?";
};

export default function AICareerCoach() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { from: "bot", text: "Hi! I'm your AI Career Coach. Ask me about skills, courses, career planning, interviews, internships, or anything career-related!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMsg = message;
    setChat([...chat, { from: "user", text: userMsg }]);
    setMessage("");
    setIsTyping(true);
    
    try {
      const response = await getAIResponse(userMsg, chat);
      setChat(prev => [...prev, { from: "bot", text: response }]);
    } catch (error) {
      setChat(prev => [...prev, { from: "bot", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">🤖 AI Career Coach</h3>
      <div className="h-48 overflow-y-auto border rounded p-3 mb-3 space-y-2">
        {chat.map((msg, i) => (
          <div key={i} className={`${msg.from === 'bot' ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block px-3 py-2 rounded text-sm ${msg.from === 'bot' ? 'bg-gray-100' : 'bg-brand text-white'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <span className="inline-block px-3 py-2 rounded text-sm bg-gray-100">
              <span className="animate-pulse">AI is typing...</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about career guidance..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-brand text-white rounded">Send</button>
      </div>
    </div>
  );
}
