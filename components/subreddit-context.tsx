import React from 'react';

import type { SubredditAbout } from '~/@types/post';

const SubredditAboutContext = React.createContext<SubredditAbout | undefined>(
  undefined
);

const SubredditAboutProvider: React.FC<{
  value: SubredditAbout | undefined;
}> = ({ children, value }) => (
  <SubredditAboutContext.Provider value={value}>
    {children}
  </SubredditAboutContext.Provider>
);

const useSubredditAbout = () => {
  const context = React.useContext(SubredditAboutContext);
  return context;
};

export { SubredditAboutProvider, useSubredditAbout };
