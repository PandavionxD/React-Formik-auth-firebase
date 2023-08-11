import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

//   Puede ser 3 tipos, el usuario en False, Null, o un Objeto
  useEffect(() => {
    // Observable de Firebase
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log({user})
    });
    return unsuscribe;
  }, []);

  if (user === false) return <p>Cargando App ...!!!</p>;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
