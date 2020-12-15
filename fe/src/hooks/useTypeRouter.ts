import { NextRouter, useRouter } from 'next/router';

const useTypeRouter = () => {
  const router = useRouter();
  const { type, userId } = router.query;
  return { type, userId, router };
};
export default useTypeRouter;
