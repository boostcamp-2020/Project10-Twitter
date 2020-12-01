import { AuthenticationError } from 'apollo-server-express';
import { tweetModel, userModel } from '../../models';
import { createNotifiaction } from '../notification';

interface Auth {
  authUser: { user_id: string };
}

interface Args {
  content: String;
  img_url_list?: [String];
  parent_id?: String;
  retweet_id?: String;
}

const findMentionUser = async (content: String, tweetId: String) => {
  const users = content.match(/@[a-zA-Z0-9]+/gi);
  if (users) {
    const test = users.map((user) => user.replace(/@/g, ''));
    const userInfo = await userModel.find({ user_id: { $in: test } });
    userInfo.map(async (user) => {
      await createNotifiaction({ userId: user.get('user_id'), type: 'mention', tweetId });
    });
  }
};

const addBasicTweet = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const { content } = args;
  const imgUrls = args.img_url_list;
  const newTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list: imgUrls,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });

  await findMentionUser(content, newTweet.get('_id'));

  return newTweet;
};

const addReplyTweet = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const { content } = args;
  const imgUrls = args.img_url_list;
  const parentId = args.parent_id;
  const replyTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list: imgUrls,
    parent_id: parentId,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });
  const childId = replyTweet?.get('_id');
  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: parentId },
    { $push: { child_tweet_list: childId } },
    { new: true },
  );

  await createNotifiaction({
    userId: parentTweet?.get('author_id'),
    tweetId: childId,
    type: 'reply',
  });

  await findMentionUser(content, replyTweet.get('_id'));

  return replyTweet;
};

const addRetweet = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const { content } = args;
  const retweetId = args.retweet_id;

  const newRetweet = await tweetModel.create({
    author_id: userId,
    content,
    retweet_id: retweetId,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });

  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: retweetId },
    { $push: { retweet_user_list: userId } },
    { new: true },
  );

  await createNotifiaction({
    userId: parentTweet?.get('author_id'),
    tweetId: newRetweet?.get('_id'),
    type: 'retweet',
  });

  await findMentionUser(content, newRetweet.get('_id'));

  return newRetweet;
};

export { addBasicTweet, addReplyTweet, addRetweet };
