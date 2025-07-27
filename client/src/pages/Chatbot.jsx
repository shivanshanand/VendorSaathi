import React, { useState, useEffect, useRef } from 'react';
import { getCurrentUser } from '../utils/auth';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Hindi AI assistant demo answers
  const hindiAnswers = {
    'raw material price': 'माल का दाम: टमाटर ₹30/kg, आलू ₹25/kg, चावल ₹60/kg।',
    'delivery time': 'डिलीवरी आमतौर पर 24 घंटे में हो जाती है।',
    'minimum order': 'न्यूनतम ऑर्डर: टमाटर 10kg, आलू 20kg, चावल 50kg।',
    'fresh material': 'हम ताजा माल ही सप्लाई करते हैं।',
    'how to buy': 'खरीदने के लिए ग्रुप बाय जॉइन करें या सप्लायर से संपर्क करें।',
    'supplier list': 'सप्लायर लिस्ट: Supplier 1, Supplier 2, Supplier 3।',
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let answer = hindiAnswers[input.trim().toLowerCase()];
      if (!answer) {
        answer = 'यह डेमो उत्तर है। आपका सवाल: "' + userMessage.content + '" जल्द ही जवाब मिलेगा। (Backend not deployed.)';
      }
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: answer,
        },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome Message */}
          <div className="bg-gradient-to-br from-orange-100 to-yellow-50 text-orange-800 p-6 rounded-xl mb-6 shadow flex flex-col items-center">
            <h2 className="font-bold text-2xl mb-2">Welcome to Hindi AI Assistant</h2>
            <p className="text-base mb-4">Ask in Hindi or English about materials, delivery, suppliers, or buying process. Demo only.</p>
            {/* Suggested Questions */}
            <div className="space-y-2 w-full">
              <p className="font-medium text-sm text-center">Quick questions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button 
                  onClick={() => setInput("raw material price")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  माल का दाम / Price?
                </button>
                <button 
                  onClick={() => setInput("delivery time")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  डिलीवरी कब होगी / Delivery time?
                </button>
                <button 
                  onClick={() => setInput("minimum order")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  न्यूनतम ऑर्डर / MOQ?
                </button>
                <button 
                  onClick={() => setInput("fresh material")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  ताजा माल / Fresh stock?
                </button>
                <button 
                  onClick={() => setInput("how to buy")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  कैसे खरीदें / How to buy?
                </button>
                <button 
                  onClick={() => setInput("supplier list")}
                  className="text-xs bg-orange-200 hover:bg-orange-300 text-orange-800 px-3 py-1 rounded-full transition shadow"
                >
                  सप्लायर लिस्ट / Supplier list?
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 mb-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-orange-600 to-orange-400 text-white shadow-lg'
                      : 'bg-white shadow-lg border border-orange-100'
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
            placeholder="Type your message..."
            className="flex-1 border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500 text-base"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-orange-600 to-orange-400 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
