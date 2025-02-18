import { child } from "firebase/database";
import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {},
});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({ user: null, userData: null });

  return (
    <AppContext.Provider
      value={{
        user: appState.user,
        userData: appState.userData,
        setContext: setAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
