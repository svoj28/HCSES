import { useEffect, useCallback } from 'react';

function useJWTDecoder() {
  const jwtDecode = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const jwtDecode = await import('jwt-decode');
      return jwtDecode.default;
    }
    return null;
  }, []);

  useEffect(() => {
    jwtDecode();
  }, [jwtDecode]);

  return jwtDecode;
}

export default useJWTDecoder;
