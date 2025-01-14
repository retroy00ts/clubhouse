import { useEffect, useMemo, useState } from 'react';
import { PfpRecord } from 'types/records';

type PfpDataResponse = Array<{
  image: string;
  mint: string;
  name: string;
}>;

export type UseLoadPfpListResponse = {
  cards: PfpRecord[];
  error?: string;
  loading: boolean;
};

export const useLoadPfpList = (): UseLoadPfpListResponse => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [cards, setCards] = useState<PfpRecord[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch('/static/json/members.json')
      .then(response => response.json())
      .then((response: PfpDataResponse) => {
        setCards(response.map(({ image, mint, name }) => ({ id: mint, image, name })));
      })
      .catch(() => setError('The y00ts are missing. Please come back later.'))
      .finally(() => setLoading(false));
  }, []);

  return useMemo(
    () => ({
      cards,
      error,
      loading,
    }),
    [cards, error, loading],
  );
};
