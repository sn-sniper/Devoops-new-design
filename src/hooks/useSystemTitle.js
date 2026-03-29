import { useEffect } from 'react';

export function useSystemTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '[SYS.IDLE] User Not Found';
      } else {
        document.title = pageTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pageTitle]);
}
