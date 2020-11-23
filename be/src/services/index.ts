import { tweetModel, userModel } from '../models';

const getTweetList = async () => {
  const _id = '2';
  const followingList = await userModel.findOne({ user_id: _id });

  if (!followingList) return;

  const tweetList = await tweetModel.find({
    author_id: { $in: followingList.get('following_list') },
  });
  return tweetList;
};
export { getTweetList };
