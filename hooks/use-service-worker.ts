/* eslint-disable no-console */
import React from 'react';

const useServiceWorker = (enabled = process.env.NODE_ENV === 'production') => {
  React.useEffect(() => {
    (async () => {
      if (enabled && 'serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully');
        } catch (error) {
          console.warn(
            'Something went wrong when registering the service worker'
          );
        }
      }
    })();
  }, [enabled]);
};

export { useServiceWorker };
