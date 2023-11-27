import React, { createContext, useEffect, useState } from "react";

import { auth } from "@config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";

import { AuthenticatedUserContextType, UserService } from "src/@types/User";
import { handleGetUserData } from "@services/reqFirebase";


export const AuthenticatedUserContext = createContext<AuthenticatedUserContextType>({} as AuthenticatedUserContextType);

const AuthenticatedUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<firebase.UserInfo | null>(null);
  const [userData, setUserData] = useState<UserService>();
  const [isLoading, setIsLoading] = useState(false);
  const [ valueChanged, isValueChanged] = useState(false);


  useEffect(() => {
    async function handle() {
      if (currentUser) {
        await handleGetUserData(currentUser.email!)
          .then((response) => {
            setUserData(response);
          })
      }
    };
    
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
        handle();
      } else {
        setIsLoading(false);
      }
    });

  }, [currentUser, userData]);


  async function logout() {
    try {
      auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticatedUserContext.Provider value={{ currentUser, userData, isLoading, logout, isValueChanged, valueChanged }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default AuthenticatedUserProvider;