import React from "react";
import PageContext from "lib/context/PageContext";
import AuthContext from "lib/context/AuthContext";

const ContextProvider = ({ children }) => (
  <AuthContext>
    <PageContext>{children}</PageContext>
  </AuthContext>
);

export default ContextProvider;
