import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';

interface Props {
  loadFinished: boolean;
  fetchMoreEl: any;
}

const LoadingCircle: FunctionComponent<Props> = ({ loadFinished, fetchMoreEl }) => {
  if (loadFinished) return <div />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '50px' }} ref={fetchMoreEl}>
      <CircularProgress />
    </div>
  );
};

export default LoadingCircle;
