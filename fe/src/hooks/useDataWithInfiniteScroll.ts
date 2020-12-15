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
) => {
  const queryVariable = { variables: { [variableTarget]: variableValue } };
  const { data, fetchMore } = useQuery(updateQuery, queryVariable);
  const { _id: bottomId } = data?.[dataTarget][data?.[dataTarget].length - 1] || {};
  const [intersecting] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || !bottomId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { [moreVariableTarget]: bottomId },
      });
    };
    asyncEffect();
  }, [intersecting]);

  return [data];
};

export default useDataWithInfiniteScroll;
