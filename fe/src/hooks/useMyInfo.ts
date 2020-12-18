import { useQuery } from '@apollo/client';
import { GET_MYINFO } from '@graphql/user';

const useMyInfo = () => {
  const { loading, error, data } = useQuery(GET_MYINFO);
  if (loading) return loading;
  if (error) return error;
  return data || {};
};

export default useMyInfo;
