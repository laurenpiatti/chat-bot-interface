import { useState } from "react";
import { ChatWindow } from "../../components/ChatWindow";
import type { ChatMessage } from "../../types";

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);

  const handleSendMessage = (msg: string) => {
    if (msg === "/clear") {
      setMessages([]);
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: msg,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    if (msg === "/Help" || msg === "/help") {
      const aiMockResponse: ChatMessage = {
        id: crypto.randomUUID(),
        content:
          "🤖 Here's some helpful info:\n- Start chatting by sending any message. \n- Use `/` for commands, `# for tags, and `@` for mentions! \n- Use the tools button for more in depth capability!",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, aiMockResponse]);
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
  };

  const toggleTool = (id: string) => {
    setSelectedToolIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          selectedToolIds={selectedToolIds}
          onToggleTool={toggleTool}
        />
      </div>
    </div>
  );
};

export default App;
