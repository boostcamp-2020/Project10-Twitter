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

const addBasicTweet = async (_: any, { content, img_url_list }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!content && !img_url_list) throw new Error('빈 트윗입니다.');

  const userId = authUser.user_id;
  const newTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });

  await findMentionUser(content, newTweet.get('_id'));

  return newTweet;
};

const addReplyTweet = async (
  _: any,
  { content, img_url_list, parent_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!parent_id) throw new Error('parent 트윗이 존재하지 않습니다.');

  const userId = authUser.user_id;
  const replyTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list,
    parent_id,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });
  const childId = replyTweet?.get('_id');
  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: parent_id },
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

const addRetweet = async (_: any, { content, retweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!retweet_id) throw new Error('retweet할 트윗이 존재하지 않습니다.');

  const userId = authUser.user_id;

  const newRetweet = await tweetModel.create({
    author_id: userId,
    content,
    retweet_id,
    child_tweet_list: [],
    retweet_list: [],
    heart_list: [],
  });

  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: retweet_id },
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
