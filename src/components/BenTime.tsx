
import { useState, useEffect, useRef } from "react";
import { Send, MinimizeIcon, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  content: string;
  role: "user" | "assistant";
}

const BenTime = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Updated API key and model
  const API_KEY = "AIzaSyDmkNJBdWSOQQrFJzUvMNF708lzf6f5g0A";
  
  useEffect(() => {
    // Add welcome message when component mounts
    setMessages([
      {
        role: "assistant",
        content: "Hi there! I'm BenTime, your AI campus assistant. Ask me about courses, schedules, or campus life!"
      }
    ]);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await callGeminiAPI(input);
      
      if (response && response.candidates && response.candidates[0]?.content?.parts[0]?.text) {
        // Add assistant message
        const assistantMessage: Message = {
          role: "assistant",
          content: response.candidates[0].content.parts[0].text
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle error
        const errorMessage: Message = {
          role: "assistant",
          content: "I'm sorry, I couldn't process your request. Please try again."
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, something went wrong. Please try again later."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const callGeminiAPI = async (userInput: string) => {
    // Updated to use the correct Gemini 2.0 Flash endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userInput }]
          }]
        })
      }
    );
    
    return await response.json();
  };
  
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="mb-4 w-[350px] max-w-[calc(100vw-32px)] flex flex-col rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200">
          {/* Chat header */}
          <div className="flex items-center justify-between bg-[#244855] text-white p-3">
            <h3 className="font-bold text-lg">BenTime</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="h-8 w-8 text-white hover:bg-[#1b3640] hover:text-white"
            >
              <MinimizeIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-[#FBE9D0]/10">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 ${
                  message.role === "user" 
                    ? "ml-auto mr-0 bg-[#E64833]/10 text-gray-900" 
                    : "ml-0 mr-auto bg-[#244855]/10 text-gray-900"
                } max-w-[80%] rounded-lg p-3`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="ml-0 mr-auto bg-[#244855]/10 text-gray-900 max-w-[80%] rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-[#244855] rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-[#244855] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 bg-[#244855] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-200 p-2">
            <input 
              type="text" 
              value={input} 
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#244855]"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              className="ml-2 bg-[#E64833] hover:bg-[#E64833]/90 text-white"
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}
      
      {/* Chat button */}
      <Button 
        onClick={toggleChat}
        className={`rounded-full h-14 w-14 bg-[#E64833] hover:bg-[#E64833]/90 text-white shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-90' : 'animate-pulse'}`}
      >
        {isOpen ? (
          <Maximize2 className="h-6 w-6" />
        ) : (
          <div className="font-bold">BT</div>
        )}
      </Button>
    </div>
  );
};

export default BenTime;
