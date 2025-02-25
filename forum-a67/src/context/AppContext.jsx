import { useState, useEffect, createContext } from "react";
import { logoutUser } from "../services/auth.service";
import { auth } from "../config/firebase-config";
import { getUserData } from "../services/users.service";
import { useAuthState } from "react-firebase-hooks/auth";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {},
  onLogout() {},
});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({ user: null, userData: null });

  const [user, loading, error] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return;
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user: appState.user,
        userData: appState.userData,
        loading,
        setContext: setAppState,
        onLogout: () =>
          logoutUser().then(() => {
            setAppState({ user: null, userData: null });
          }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
