interface Props {
  trigger: "/" | "@" | "#";
  query: string;
  suggestions: string[];
  onSelect: (selected: string) => void;
}

export const SuggestionPopover = ({
  trigger: _trigger,
  query: _query,
  suggestions,
  onSelect,
}: Props) => {
  return (
    <ul className="max-h-40 overflow-y-auto">
      {suggestions.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onSelect(item)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
