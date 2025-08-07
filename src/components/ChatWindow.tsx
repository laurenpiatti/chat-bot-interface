import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";
import MessageList from "./MessageList";
import { MessageInput } from "./MessageInput";
import ToolList from "./ToolList";
import { mockTools } from "../data/mockData";

interface Props {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  selectedToolIds: string[];
  onToggleTool: (id: string) => void;
}

export const ChatWindow = ({
  messages,
  onSendMessage,
  selectedToolIds,
  onToggleTool,
}: Props) => {
  const [showTools, setShowTools] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showTools) return;

    function handleClickOutside(event: MouseEvent) {
      // If click is outside both the tools popup and the button, close tools
      if (
        toolsRef.current &&
        !toolsRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTools(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTools]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>

      <div className="border-t p-4 bg-gray-800 shadow-inner">
        <MessageInput
          onSend={(message) => {
            if (message.startsWith("/clear")) {
              onSendMessage("/clear");
              return;
            }
            onSendMessage(message);
          }}
        />

        <div className="max-w-3xl mx-auto w-full relative mt-3 text-left">
          <button
            ref={buttonRef}
            onClick={() => setShowTools((prev) => !prev)}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Tools
          </button>

          {showTools && (
            <div ref={toolsRef} className="absolute bottom-full left-0 z-10">
              <ToolList
                tools={mockTools}
                selectedToolIds={selectedToolIds}
                onToggle={onToggleTool}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
