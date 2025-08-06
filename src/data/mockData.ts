import type { User, Command, Tag, Tool } from "../types";

export const users: User[] = [
  { id: 1, name: "Lauren" },
  { id: 2, name: "Johnathan" },
];

export const commands: Command[] = ["/clear", "/help", "/debug"];

export const tags: Tag[] = ["#design", "#urgent", "#frontend"];

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "Translate",
    description: "Translate text to another language",
    enabled: true,
  },
  {
    id: 2,
    name: "Summarize",
    description: "Summarize long texts into concise summaries",
    enabled: true,
  },
];
