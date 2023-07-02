import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export function useAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      if (currentUser) {
        // Check if the user is newly registered (just signed up)
        const isNewUser = currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime;
        
        if (isNewUser) {
          // If the user is newly registered, do not set the user state
          setUser(null);
        } else {
          // If the user is not newly registered, set the user state
          setUser(currentUser);
        }
      } else {
        // If there is no user, set the user state to null
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
}
