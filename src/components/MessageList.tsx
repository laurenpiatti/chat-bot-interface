import React from "react";
import type { ChatMessage } from "../types";

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl max-w-3xl mx-auto whitespace-pre-wrap text-sm ${
            message.sender === "user"
              ? "bg-blue-700 text-white"
              : message.sender === "bot"
              ? "bg-gray-700 text-gray-300 italic"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
