import { userModel, tweetModel } from '../models';

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

const addBasicTweet = async (_: any, args: any) => {
  const userId = 'test1';
  const content = '트윗 내용';
  const imgUrls = [] as Array<String>;
  const newTweet = await tweetModel.create({
    author_id: userId,
    content: content,
    img_url_list: imgUrls,
    child_tweet_list: [],
  });
  console.log(newTweet);
  return newTweet;
};

const addReplyTweet = async (_: any, args: any) => {
  const userId = 'test1';
  const content = '트윗 내용';
  const imgUrls = [] as Array<String>;
  const parentId = '5fbca83023d2695f10ab52b4';

  const replyTweet = await tweetModel.create({
    author_id: userId,
    content: content,
    img_url_list: imgUrls,
    parent_id: parentId,
    child_tweet_list: [],
  });
  console.log(replyTweet);

  const childId = replyTweet?.get('_id');

  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: parentId },
    { $push: { child_tweet_list: childId } },
    { new: true },
  );

  console.log(parentTweet);

  return replyTweet;
};

export { getFollowingTweetList, getUserTweetList, addBasicTweet, addReplyTweet };
