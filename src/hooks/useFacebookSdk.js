import { useEffect, useState } from 'react';

const useFacebookSdk = () => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    const checkSdkReady = () => {
      if (window.FB) {
        setIsSdkLoaded(true);
      } else {
        setTimeout(checkSdkReady, 100);
      }
    };
    checkSdkReady();
  }, []);

  return isSdkLoaded;
};

export default useFacebookSdk;