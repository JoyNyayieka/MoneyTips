// pages/ChatPage.js
// import React from 'react';
// import ChatView from '../components/ChatView';

// export default function ChatPage() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">MoneyTips AI Chat</h1>
//       <p className="text-gray-600">Get personalized financial advice from our AI assistant</p>
//       <ChatView />
//     </div>
//   );
// }
import React, { useState, useRef } from 'react';
import { FiMic, FiPaperclip, FiSend } from 'react-icons/fi';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import {callAPI} from 'apis/api'

const ChatView = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() || selectedFile) {
      const newMessage = {
        text: input,
        sender: 'user',
        file: selectedFile
      };
      setMessages([...messages, newMessage]);
      setInput('');
      setSelectedFile(null);

      try {

        let botMessages = []

        if (selectedFile){
          const formData = new FormData();
          formData.append("file", selectedFile);

          const fileResponse = await callAPI("/upload_file", formData);
          botMessages.push({
            text: `I've received your file: "${fileResponse.filename}" (${fileResponse.size} bytes).`,
            sender: 'bot'
        });
        }

        if (input.trim()) {
          const textResponse = await callAPI("/receive_text", { text: input });
          botMessages.push({
            text: textResponse.message,
            sender: 'bot'
          });
        }

        setMessages(prev => [
          ...prev,
          ...botMessages
        ]);
      } catch (error){
        setMessages(prev => [
          ...prev,
          {text:"Error: " + error.message, sender: 'bot'}
        ]);
      }
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      // Start voice recording
      setIsRecording(true);
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsRecording(false);
        };
        
        recognition.start();
      } else {
        alert('Voice recognition not supported in your browser');
        setIsRecording(false);
      }
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size too large (max 5MB)');
        return;
      }
      setSelectedFile(file);
      setInput(prev => prev ? prev : `Attached: ${file.name}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4 border rounded-lg">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-lg max-w-[80%] ${
              msg.sender === 'user' 
                ? 'bg-indigo-100 ml-auto' 
                : 'bg-gray-100 mr-auto'
            }`}
          >
            {msg.text}
            {msg.file && (
              <div className="mt-2 p-2 bg-white rounded border flex items-center">
                <FiPaperclip className="mr-2" />
                <span className="truncate">{msg.file.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({Math.round(msg.file.size / 1024)} KB)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        {selectedFile && (
          <div className="flex items-center justify-between mb-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <FiPaperclip className="mr-2" />
              <span className="truncate max-w-xs">{selectedFile.name}</span>
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Attach file"
          >
            <FiPaperclip size={20} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
            />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about money tips..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />

          <button
            onClick={handleVoiceRecord}
            className={`p-2 rounded-full ${
              isRecording 
                ? 'text-red-500 bg-red-50 animate-pulse' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
            }`}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
          </button>

          <button
            onClick={handleSend}
            disabled={!input && !selectedFile}
            className={`p-2 rounded-full ${
              input || selectedFile
                ? 'text-indigo-600 hover:bg-indigo-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">MoneyTips AI Chat</h1>
      <p className="text-gray-600">Get personalized financial advice from our AI assistant</p>
      <ChatView />
    </div>
  );
}