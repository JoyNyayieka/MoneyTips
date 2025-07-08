import React from 'react';
import useChat from '../hooks/useChat';

export default function ChatView() {
  const { input, setInput, history, sendMessage, isLoading } = useChat();

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow h-96 overflow-y-auto">
        {history.map((msg, i) => (
          <div key={i} className={`mb-3 p-3 rounded-lg max-w-xs md:max-w-md ${msg.sender === "user" ? "bg-indigo-100 ml-auto" : "bg-gray-100"}`}>
            <p>{msg.message}</p>
          </div>
        ))}
        {isLoading && <div className="p-3 rounded-lg bg-gray-100 max-w-xs">Thinking...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about money tips..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}