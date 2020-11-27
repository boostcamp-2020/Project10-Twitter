import { tweetModel } from '../../models';
import { AuthenticationError } from 'apollo-server-express';

const addBasicTweet = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const content = args.content;
  const imgUrls = args.img_url_list;
  const newTweet = await tweetModel.create({
    author_id: userId,
    content: content,
    img_url_list: imgUrls,
    child_tweet_list: [],
  });
  return newTweet;
};

const addReplyTweet = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const content = args.content;
  const imgUrls = args.img_url_list;
  const parentId = args.parent_id;

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
  return replyTweet;
};

const addRetweet = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const content = args.content;
  const retweetId = args.retweet_id;

  const newRetweet = await tweetModel.create({
    author_id: userId,
    content: content,
    retweet_id: retweetId,
    child_tweet_list: [],
  });
  return newRetweet;
};

export { addBasicTweet, addReplyTweet, addRetweet };
