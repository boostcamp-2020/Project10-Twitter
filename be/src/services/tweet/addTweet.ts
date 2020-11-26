import { tweetModel } from '../../models';

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

  const newTweetId = newTweet?.get('_id');

  const resultTweet = await tweetModel.aggregate([
    {
      $match: {
        _id: newTweetId,
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

  return resultTweet[0];
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
  const childId = replyTweet?.get('_id');
  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: parentId },
    { $push: { child_tweet_list: childId } },
    { new: true },
  );

  const resultTweet = await tweetModel.aggregate([
    {
      $match: {
        _id: childId,
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

  return resultTweet[0];
};

const addRetweet = async (_: any, args: any) => {
  const userId = 'test1';
  const content = '트윗 리트윗';
  const retweetId = '5fbca83023d2695f10ab52b4';

  const newTweet = await tweetModel.create({
    author_id: userId,
    content: content,
    retweet_id: retweetId,
    child_tweet_list: [],
  });

  const newTweetId = newTweet?.get('_id');

  const resultTweet = await tweetModel.aggregate([
    {
      $match: {
        _id: newTweetId,
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
    {
      $lookup: {
        from: 'tweets',
        localField: 'retweet_id',
        foreignField: '_id',
        as: 'retweet',
      },
    },
    { $unwind: '$retweet' },
    {
      $lookup: {
        from: 'users',
        localField: 'retweet.author_id',
        foreignField: 'user_id',
        as: 'retweet.author',
      },
    },
    { $unwind: '$retweet.author' },
  ]);

  return resultTweet[0];
};

export { addBasicTweet, addReplyTweet, addRetweet };
