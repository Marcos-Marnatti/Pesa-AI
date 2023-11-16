import firebase from "firebase/compat/app";

export type UserService = {
  name: string;
  email: string;
  sex: string;
  password?: string;
  age: number;
  size: number;
  weight: number;
  physicalActivity: string;
  weightGoal: string;
  basalMetabolicRate?: number;
};

export type AuthenticatedUserContextType = {
  currentUser: firebase.UserInfo | null;
  userData: UserService | undefined;
  isLoading: boolean;
  logout: () => void;
};

