export const askChatbot = (req, res) => {
  const { question } = req.body;
  const faqs = [
    { q: ["raw material price", "माल का दाम"], a: "Price varies by supplier. Use the filter to compare prices." },
    { q: ["delivery time", "डिलीवरी कब होगी"], a: "Delivery is usually within 2-3 days. Check supplier details." },
    { q: ["minimum order", "MOQ", "न्यूनतम ऑर्डर"], a: "Minimum order quantity (MOQ) is set by each supplier." },
    { q: ["fresh material", "ताजा माल"], a: "Suppliers provide fresh stock. Check ratings and reviews." },
    { q: ["कैसे खरीदें", "how to buy"], a: "Group buy में शामिल होकर सस्ता माल खरीदें!" },
    { q: ["सप्लायर लिस्ट", "supplier list"], a: "Use the Supplier Listing to see all available suppliers." },
  ];
  const lowerQ = question?.toLowerCase() || "";
  const found = faqs.find(faq => faq.q.some(q => lowerQ.includes(q)));
  if (found) {
    return res.json({ answer: found.a });
  }
  res.json({ answer: "Sorry, I don't know that. कृपया दूसरा सवाल पूछें।" });
};

export const askGemini = (req, res) => {
  // Placeholder for future AI integration
  res.json({ answer: "AI chatbot coming soon!" });
}; 