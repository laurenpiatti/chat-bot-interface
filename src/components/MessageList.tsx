import React from "react";
import type { ChatMessage } from "../types";

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`p-4 rounded-xl max-w-2xl mx-auto`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
