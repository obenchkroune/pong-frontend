import { User } from "./pages/api/user";

declare global {
  interface Window {
    _currentUser: User | null;
  }
}

export {};
