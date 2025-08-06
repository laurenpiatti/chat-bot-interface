// src/components/MessageInput.tsx
import { useState, useRef, useEffect } from "react";
import { commands, tags, users } from "../data/mockData";
import { SuggestionPopover } from "./SuggestionPopover";

interface Props {
  onSend: (msg: string) => void;
}

type TriggerType = "/" | "@" | "#" | null;

export const MessageInput = ({ onSend }: Props) => {
  const [input, setInput] = useState("");
  const [trigger, setTrigger] = useState<TriggerType>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const match = value.match(/([/@#])(\w*)$/);
    if (match) {
      const [_, symbol, word] = match;
      setTrigger(symbol as TriggerType);
      setQuery(word);

      if (symbol === "/") {
        setSuggestions(commands.filter((cmd) => cmd.includes(`/${word}`)));
      } else if (symbol === "@") {
        setSuggestions(
          users
            .map((u) => u.name)
            .filter((name) => name.toLowerCase().includes(word.toLowerCase()))
        );
      } else if (symbol === "#") {
        setSuggestions(tags.filter((tag) => tag.includes(`#${word}`)));
      }

      setShowPopover(true);
    } else {
      setTrigger(null);
      setShowPopover(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSend(input.trim());
        setInput("");
        setShowPopover(false);
        setTrigger(null);
      }
    }
  };

  const handleSuggestionSelect = (selected: string) => {
    if (!trigger) return;

    const match = input.match(/([/@#])(\w*)$/);
    if (!match) return;

    const { index } = match;
    if (index === undefined) return;

    const before = input.slice(0, index);
    const after = input.slice(index + match[0].length);
    const newInput = `${before}${selected} ${after}`;

    setInput(newInput);
    setTrigger(null);
    setShowPopover(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className="w-full border rounded p-3 resize-none overflow-hidden min-h-[50px] max-h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message... (press Enter to send, Shift+Enter for newline)"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />

      {showPopover && suggestions.length > 0 && trigger && (
        <div className="absolute z-10 bg-white border rounded shadow-md mt-1 w-60">
          <SuggestionPopover
            trigger={trigger}
            query={query}
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
          />
        </div>
      )}
    </div>
  );
};
