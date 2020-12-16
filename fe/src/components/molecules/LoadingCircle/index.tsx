import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import Contaniner from './styled';

interface Props {
  loadFinished: boolean;
  fetchMoreEl: any;
}

const LoadingCircle: FunctionComponent<Props> = ({ loadFinished, fetchMoreEl }) => {
  if (loadFinished) return <div />;

  return (
    <Contaniner ref={fetchMoreEl}>
      <CircularProgress />
    </Contaniner>
  );
};

export default LoadingCircle;
