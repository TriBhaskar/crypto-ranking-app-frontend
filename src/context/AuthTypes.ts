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
  isRegistering: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRegistrationStatus: (status: boolean) => void;
}
