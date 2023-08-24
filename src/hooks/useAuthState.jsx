import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log("useAuthState useEffect fired");

    setLoading(true); // Set loading to true when starting to fetch auth state
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
      
      setLoading(false); // Set loading to false when auth state is fetched
    });


    return () => {
      console.log("useAuthState useEffect cleanup");
      unsubscribe();
    };
  }, []);

  return {user,loading};
}
