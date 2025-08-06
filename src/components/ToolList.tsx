import React from "react";
import type { Tool } from "../types";

type ToolListProps = {
  tools: Tool[];
  selectedToolIds: string[];
  onToggle: (id: string) => void;
};

const ToolList: React.FC<ToolListProps> = ({
  tools,
  selectedToolIds,
  onToggle,
}) => {
  return (
    <div className="space-y-2">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className={`p-2 rounded-lg border cursor-pointer ${
            selectedToolIds.includes(tool.id.toString())
              ? "bg-blue-200"
              : "bg-white"
          }`}
          onClick={() => onToggle(tool.id.toString())}
        >
          <div className="font-semibold">{tool.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ToolList;
