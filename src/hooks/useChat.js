import { useState } from 'react';
import axios from 'axios';

export default function useChat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const userMessage = { sender: "user", message: input };
      setHistory(prev => [...prev, userMessage]);
      
      const res = await axios.post("/api/chatbot", { message: input });
      const botMessage = { sender: "bot", message: res.data.reply };
      setHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = { sender: "bot", message: "Sorry, I encountered an error. Please try again." };
      setHistory(prev => [...prev, errorMessage]);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return { input, setInput, history, sendMessage, isLoading };
}