import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialPromptSent, setIsInitialPromptSent] = useState(false);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI('AIzaSyDBhoJdfBpX9F_nxHBWJdTck6kst3Ru7cA');

    const menuItems = [
        { name: "Greek Salad", price: 220 },
        { name: "Veg Salad", price: 180 },
        { name: "Clover Salad", price: 160 },
        { name: "Chicken Salad", price: 240 },
        { name: "Lasagna Rolls", price: 140 },
        { name: "Peri Peri Rolls", price: 120 },
        { name: "Chicken Rolls", price: 200 },
        { name: "Veg Rolls", price: 150 },
        { name: "Ripple Ice Cream", price: 140 },
        { name: "Fruit Ice Cream", price: 220 },
        { name: "Jar Ice Cream", price: 100 },
        { name: "Vanilla Ice Cream", price: 99 },
        { name: "Chicken Sandwich", price: 140 },
        { name: "Vegan Sandwich", price: 180 },
        { name: "Grilled Sandwich", price: 160 },
        { name: "Bread Sandwich", price: 180 },
        { name: "Cup Cake", price: 80 },
        { name: "Vegan Cake", price: 140 },
        { name: "Butterscotch Cake", price: 200 },
        { name: "Sliced Cake", price: 140 },
        { name: "Garlic Mushroom", price: 140 },
        { name: "Fried Cauliflower", price: 210 },
        { name: "Mix Veg Pulao", price: 150 },
        { name: "Rice Zucchini", price: 180 },
        { name: "Cheese Pasta", price: 180 },
        { name: "Tomato Pasta", price: 190 },
        { name: "Creamy Pasta", price: 170 },
        { name: "Chicken Pasta", price: 240 },
        { name: "Butter Noodles", price: 160 },
        { name: "Veg Noodles", price: 120 },
        { name: "Somen Noodles", price: 200 },
        { name: "Ramen Noodles", price: 150 }
    ];

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

        // Add user message to chat
        const newMessages = [...messages, { type: 'user', content: inputMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            // Build prompt
            let prompt = '';
        
            prompt += `You are a helpful and precise food assistant. You always give one to two line, accurate answers based only on the menu provided. Answer user queries precisely and to the point.\n\n`;
            prompt += `Here is the food menu:\n`;
            menuItems.forEach(item => {
                prompt += `${item.name}: ₹${item.price}\n`;
            });
            prompt += `\nNow the user says: "${inputMessage}"`;
            setIsInitialPromptSent(true);
        
        
        
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setMessages([...newMessages, { type: 'bot', content: text }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { type: 'bot', content: 'Sorry, I encountered an error.' }]);
        }

        setIsLoading(false);
        setInputMessage('');
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen ? (
                <button
                    onClick={toggleChat}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            ) : (
                <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="bg-orange-500 p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-white font-bold">Food Assistant</h3>
                        <button onClick={toggleChat} className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`rounded-lg p-2 max-w-[80%] ${
                                        message.type === 'user'
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg p-2">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <div className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about any food..."
                                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
