export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: number;
  name: string;
}

export type Command = string;
export type Tag = string;

export type Tool = {
  id: number;
  name: string;
  description: string;
  enabled?: boolean;
};
