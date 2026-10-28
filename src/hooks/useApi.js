import { useCallback, useEffect, useState } from "react";

// Charge une ressource de l'API et expose { data, loading, error, retry }.
// `request` est une fonction du service (ex: getCategory), `args` ses paramètres.
// Passer `null` comme requête désactive le chargement (ex: Master Mode hors BOTW).
export default function useApi(request, ...args) {
  const key = JSON.stringify(args);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    if (!request) return;
    let ignore = false;
    request(...JSON.parse(key)).then(
      (data) => !ignore && setResult({ key, attempt, data, error: null }),
      (error) => !ignore && setResult({ key, attempt, data: null, error })
    );
    return () => {
      ignore = true;
    };
  }, [request, key, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  if (!request) return { data: null, loading: false, error: null, retry };
  const loading = result.key !== key || result.attempt !== attempt;
  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    retry,
  };
}
