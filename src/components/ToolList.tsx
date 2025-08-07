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
    <div className="absolute bottom-full mb-2 left-0 w-64 bg-gray-800 border border-gray-700 rounded shadow p-3 z-10">
      <div className="flex flex-col space-y-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`p-2 rounded-lg border cursor-pointer ${
              selectedToolIds.includes(tool.id.toString())
                ? "bg-blue-600 text-white border-blue-400"
                : "bg-gray-700 text-white border-gray-600"
            }`}
            onClick={() => onToggle(tool.id.toString())}
          >
            <div className="font-semibold">{tool.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolList;
