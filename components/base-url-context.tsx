import React from 'react';

type BaseUrl = string | undefined;
const BaseURLContext = React.createContext<BaseUrl>(undefined);

const BaseUrlProvider: React.FC<{ baseUrl: string }> = ({
  children,
  baseUrl,
}) => (
  <BaseURLContext.Provider value={baseUrl}>{children}</BaseURLContext.Provider>
);

const useBaseUrl = () => {
  const context = React.useContext(BaseURLContext);
  if (!context) {
    throw new Error('useBaseUrl must be used within a BaseUrlProvider');
  }
  return context;
};

export { BaseUrlProvider, useBaseUrl };
