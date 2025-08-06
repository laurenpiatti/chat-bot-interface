// src/App.tsx
import { useState } from "react";
import { ChatWindow } from "../../components/ChatWindow";
import ToolList from "../../components/ToolList";
import { mockTools } from "../../data/mockData";
import type { ChatMessage } from "../../types";

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);

  const handleSendMessage = (msg: string) => {
    if (msg === "/clear") {
      setMessages([]);
      return;
    }

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: msg,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const toggleTool = (id: string) => {
    setSelectedToolIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Window */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
      </div>

      {/* Tool Selector */}
      <div className="border-t p-4 bg-white shadow-inner">
        <h2 className="text-sm font-medium mb-2 text-gray-700">Tools</h2>
        <ToolList
          tools={mockTools}
          selectedToolIds={selectedToolIds}
          onToggle={toggleTool}
        />
      </div>
    </div>
  );
};

export default App;
