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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

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
        const lowerWord = word.toLowerCase();
        setSuggestions(
          commands.filter((cmd) => cmd.toLowerCase().includes(`/${lowerWord}`))
        );
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

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions, showPopover]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      showPopover &&
      (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab")
    ) {
      e.preventDefault();

      if (e.key === "ArrowDown" || e.key === "Tab") {
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      }
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSuggestionSelect(suggestions[highlightedIndex]);
        setHighlightedIndex(-1);
        return;
      }

      if (input.trim()) {
        onSend(input.trim());
        setInput("");
        setShowPopover(false);
        setTrigger(null);
        setHighlightedIndex(-1);
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
    <div className="max-w-3xl mx-auto w-full relative">
      <textarea
        ref={textareaRef}
        className="w-full rounded-xl border border-gray-300 p-3 resize-none overflow-hidden min-h-[48px] max-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white shadow"
        placeholder="Send a message"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />

      {showPopover && suggestions.length > 0 && trigger && (
        <div className="absolute bottom-full mb-2 w-60 z-10 left-0">
          <SuggestionPopover
            trigger={trigger}
            query={query}
            suggestions={suggestions}
            highlightedIndex={highlightedIndex}
            onSelect={handleSuggestionSelect}
          />
        </div>
      )}
    </div>
  );
};
