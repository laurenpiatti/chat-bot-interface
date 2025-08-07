import { useEffect, useRef } from "react";

interface Props {
  trigger: "/" | "@" | "#";
  query: string;
  suggestions: string[];
  highlightedIndex: number;
  onSelect: (selected: string) => void;
}

export const SuggestionPopover = ({
  trigger: _trigger,
  query: _query,
  highlightedIndex,
  suggestions,
  onSelect,
}: Props) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      itemRefs.current[highlightedIndex] !== null &&
      itemRefs.current[highlightedIndex] !== undefined
    ) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <ul className="absolute bottom-full mb-2 left-0 max-h-40 overflow-y-auto bg-gray-800 text-white border border-gray-600 rounded shadow z-10 w-64">
      {suggestions.map((item, idx) => (
        <li
          key={idx}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onClick={() => onSelect(item)}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
            idx === highlightedIndex ? "bg-blue-600" : ""
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
