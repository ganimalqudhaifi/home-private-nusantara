'use hook';
// wait, it is a custom hook, standard react
import useSWR from 'swr';

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR('/api/user/me');

  return {
    user: data?.user || null,
    authenticated: data?.authenticated || false,
    isLoading,
    isError: error,
    mutate,
  };
}
