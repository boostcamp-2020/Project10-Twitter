import { userModel, tweetModel } from '../../models';

const getFollowingTweetList = async (_: any, args: any) => {
  const userId = args.id;
  const followingList = await userModel.findOne({ user_id: userId });

  const tweetList = await tweetModel.aggregate([
    {
      $match: {
        $and: [
          { author_id: { $in: followingList?.get('following_list') } },
          { parent_id: { $exists: false } },
        ],
      },
    },
    {
      $project: {
        author_id: 1,
        content: 1,
        img_url_list: 1,
        parent_id: 1,
        retweet_id: 1,
        child_tweet_list: 1,
        child_tweet_number: { $size: '$child_tweet_list' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'user_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
  ]);
  return tweetList;
};

const getUserTweetList = async (_: any, args: any) => {
  const userId = args.id;
  const tweetList = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ author_id: userId }, { parent_id: { $exists: false } }],
      },
    },
    {
      $project: {
        author_id: 1,
        content: 1,
        img_url_list: 1,
        parent_id: 1,
        retweet_id: 1,
        child_tweet_list: 1,
        child_tweet_number: { $size: '$child_tweet_list' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'user_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
  ]);
  return tweetList;
};

export { getFollowingTweetList, getUserTweetList };
