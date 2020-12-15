import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useInfiniteScroll } from '@hooks';

const useDataWithInfiniteScroll = (
  variableTarget: string,
  variableValue: string,
  moreVariableTarget: string,
  dataTarget: string,
  updateQuery: any,
  fetchMoreEl: React.MutableRefObject<null>,
): [
  any,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]  => {
  const queryVariable = { variables: { [variableTarget]: variableValue } };
  const { data, fetchMore } = useQuery(updateQuery, queryVariable);
  const { _id: bottomId } = data?.[dataTarget][data?.[dataTarget].length - 1] || {};
  const [intersecting, setIntersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || !bottomId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { [moreVariableTarget]: bottomId },
      });
      if (!fetchMoreData) setIntersecting(false);
      if (fetchMoreData.[dataTarget].length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  return [data, setIntersecting, loadFinished, setLoadFinished];
};

export default useDataWithInfiniteScroll;
