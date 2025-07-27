import React, { useState, useEffect, useRef } from 'react';
import { getCurrentUser } from '../utils/auth';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const user = getCurrentUser();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot/ask', 
        { question: input },
        { withCredentials: true }
      );
      if (res.data && res.data.answer) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.answer }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: ('errorMessage') }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome Message */}
          <div className="bg-orange-100 text-orange-800 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">{('welcomeToChat')}</h2>
            <p className="text-sm mb-4">{('chatbotDescription')}</p>
            
            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="font-medium text-sm">You can ask questions about:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setInput("raw material price")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  माल का दाम / Price?
                </button>
                <button 
                  onClick={() => setInput("delivery time")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  डिलीवरी कब होगी / Delivery time?
                </button>
                <button 
                  onClick={() => setInput("minimum order")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  न्यूनतम ऑर्डर / MOQ?
                </button>
                <button 
                  onClick={() => setInput("fresh material")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  ताजा माल / Fresh stock?
                </button>
                <button 
                  onClick={() => setInput("how to buy")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  कैसे खरीदें / How to buy?
                </button>
                <button 
                  onClick={() => setInput("supplier list")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition"
                >
                  सप्लायर लिस्ट / Supplier list?
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white shadow'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={('typeMessage')}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? ('sending') : ('send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
