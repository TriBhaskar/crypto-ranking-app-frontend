// types/AuthTypes.ts
export interface User {
  status: string;
  message: string;
  username: string;
  jwt: string;
  timestamp: string; // Use string to store ISO timestamp
}

export interface AuthContextType {
  user: User | null; // null when not logged in
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
