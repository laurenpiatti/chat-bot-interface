import type { ChatMessage } from "../types";
import MessageList from "./MessageList";
import { MessageInput } from "./MessageInput";

interface Props {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const ChatWindow = ({ messages, onSendMessage }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>

      <div className="border-t p-4">
        <MessageInput
          onSend={(message) => {
            if (message.startsWith("/clear")) {
              onSendMessage("/clear");
              console.log("Clearing messages...");
              return;
            }

            onSendMessage(message);
          }}
        />
      </div>
    </div>
  );
};
