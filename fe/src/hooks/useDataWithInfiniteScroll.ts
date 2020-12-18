import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useInfiniteScroll } from '@hooks';

interface Props {
  variableTarget: string;
  variableValue?: string | string[];
  moreVariableTarget: string;
  dataTarget: string;
  updateQuery: DocumentNode;
  fetchMoreEl: React.RefObject<HTMLDivElement>;
}

const useDataWithInfiniteScroll = ({
  variableTarget,
  variableValue,
  moreVariableTarget,
  dataTarget,
  updateQuery,
  fetchMoreEl,
}: Props): [
  any,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const queryVariable = { variables: { [variableTarget]: variableValue } };
  const { data, fetchMore } = useQuery(updateQuery, queryVariable);
  const { _id: bottomId } = data?.[dataTarget][data?.[dataTarget].length - 1] || {};
  const [intersecting, setIntersecting, loadFinished, setLoadFinished] = useInfiniteScroll(
    fetchMoreEl,
  );

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || !fetchMore) return;
      const { data: fetchMoreData }: any = await fetchMore({
        variables: { [moreVariableTarget]: bottomId },
      });
      if (!fetchMoreData) setIntersecting(false);
      if (fetchMoreData[dataTarget].length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  return [data, setIntersecting, loadFinished, setLoadFinished];
};

export default useDataWithInfiniteScroll;
