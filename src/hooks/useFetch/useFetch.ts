import { useMemo, usePromise } from '@nebula.js/stardust';

export default function useFetch<T>(
  fetch: () => Promise<T>,
  deps: unknown[]
): [result: T | undefined, isLoading: boolean, error: Error | undefined] {
  // A bit of a hack, but if an error is thrown, the next render the error will
  // linger in the "error" variable from "usePromise" before the "fetch()" has resolved
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ref = useMemo<{ isLoading: boolean }>(() => ({ isLoading: true }), deps);

  const [response, error] = usePromise(async () => {
    let result: T | undefined;
    try {
      result = await fetch();
    } finally {
      ref.isLoading = false;
    }

    return {
      result,
      deps,
    };
  }, deps);

  return [response?.result, ref.isLoading, error];
}
