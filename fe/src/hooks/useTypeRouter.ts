import { NextRouter, useRouter } from 'next/router';

const useTypeRouter = (): [string | string[] | undefined, NextRouter] => {
  const router = useRouter();
  const { type } = router.query;
  return [type, router];
};
export default useTypeRouter;
