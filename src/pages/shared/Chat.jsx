import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const facultyList = [
  { id: 1, name: "Dr. Smith", department: "Computer Science" },
  { id: 2, name: "Prof. Johnson", department: "Mathematics" },
  { id: 3, name: "Dr. Williams", department: "Physics" }
];

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <p className="text-red-500">Please login to access chat</p>
      </div>
    );
  }

  function send() {
    if (!text || !selectedFaculty) return;
    setMessages(m => [...m, { from: user.id, text, timestamp: new Date() }]);
    setText("");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Faculty List</h3>
          <div className="space-y-2">
            {facultyList.map(faculty => (
              <button
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className={`w-full text-left p-3 rounded ${selectedFaculty?.id === faculty.id ? 'bg-brand text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="font-medium">{faculty.name}</div>
                <div className="text-xs opacity-75">{faculty.department}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          {selectedFaculty ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat with {selectedFaculty.name}</h2>
              <div className="h-64 overflow-auto p-3 border rounded mb-3 flex flex-col gap-2">
                {messages.map((m, i) => (
                  <div key={i} className={`${m.from === user.id ? "self-end bg-brand text-white" : "self-start bg-gray-100 text-gray-800"} p-2 rounded max-w-[80%]`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && send()}
                  className="flex-1 p-3 border rounded" 
                  placeholder="Type a message" 
                />
                <button onClick={send} className="px-4 py-2 rounded bg-brand text-white">Send</button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a faculty member to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
