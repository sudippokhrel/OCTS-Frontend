import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { useAuthState } from "../../hooks/useAuthState";

import PropTypes from "prop-types";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const user = useAuthState();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

UserAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUserAuth() {
  return useContext(userAuthContext);
}
