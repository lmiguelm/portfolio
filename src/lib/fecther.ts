import useSWR from 'swr';

export function useFetch<T = number>(url: string, revalidateOnFocus = false) {
  const { data, error } = useSWR<T>(
    url,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();

      return data.views;
    },
    {
      revalidateOnFocus,
      initialData: 0,
    }
  );

  return { data, error };
}
