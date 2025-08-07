import type { User, Command, Tag, Tool } from "../types";

export const users: User[] = [
  { id: 1, name: "Lauren" },
  { id: 2, name: "Johnathan" },
];

export const commands: Command[] = [
  "/Agent mode",
  "/Deep research",
  "/Create image",
  "/Study and learn",
  "/Search",
  "/Help",
];

export const tags: Tag[] = [
  "#design",
  "#urgent",
  "#frontend",
  "#backend",
  "#bug",
  "#feature",
  "#discussion",
  "#help",
  "#question",
];

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "Study and learn",
    description: "Study and learn description",
    enabled: true,
  },
  {
    id: 2,
    name: "Create Image",
    description: "Create image description",
    enabled: true,
  },
  {
    id: 3,
    name: "Think Longer",
    description: "Think longer description",
    enabled: true,
  },
  {
    id: 4,
    name: "Deep Research",
    description: "Deep research description",
    enabled: true,
  },
  {
    id: 5,
    name: "Web Search",
    description: "Web search description",
    enabled: true,
  },
  {
    id: 6,
    name: "Canvas",
    description: "Canvas description",
    enabled: true,
  },
];
