import React from "react";
import { useState } from "react";

export type AuthDispatch = React.Dispatch<string>;

interface Props {
  children: React.ReactNode;
}

const AuthStateContext = React.createContext<string | null>(null);
const AuthDispatchContext = React.createContext<AuthDispatch | null>(null);

const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string>();
  return (
    <AuthDispatchContext.Provider value={setToken}>
      <AuthStateContext.Provider value={token}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => {
  const state = React.useContext(AuthStateContext);
  return state;
};

export const useAuthDispatch = () => {
  const dispatch = React.useContext(AuthDispatchContext);
  return dispatch;
};

export default AuthContextProvider;
