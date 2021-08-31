import { Project, Collection } from "lib/generated/client";
import { Page } from "lib/types/page";
import React from "react";
import { useState } from "react";

export type PageDispatch = React.Dispatch<PageState>;

interface Props {
  children: React.ReactNode;
}

interface PageState {
  project?: Project | string;
  collection?: Collection | string;
  page: Page;
}

const PageStateContext = React.createContext<PageState | null>(null);
const PageDispatchContext = React.createContext<PageDispatch | null>(null);

const PageContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<PageState>({
    project: null,
    collection: null,
    page: "Index",
  });

  return (
    <PageDispatchContext.Provider value={setState}>
      <PageStateContext.Provider value={state}>
        {children}
      </PageStateContext.Provider>
    </PageDispatchContext.Provider>
  );
};

export const usePageState = () => {
  const state = React.useContext(PageStateContext);
  return state;
};

export const usePageDispatch = () => {
  const dispatch = React.useContext(PageDispatchContext);
  return dispatch;
};

export default PageContextProvider;
