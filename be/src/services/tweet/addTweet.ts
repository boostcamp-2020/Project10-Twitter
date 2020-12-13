import { AuthenticationError } from 'apollo-server-express';
import { tweetModel, userModel } from '@models';
import { createNotification } from '@services/notification';

interface Auth {
  authUser: { id: string };
}

interface Args {
  content: string;
  img_url_list?: [string];
  parent_id?: string;
  retweet_id?: string;
}

const findMentionUser = async (content: string, tweetId: string, giverId: string) => {
  const users = content.match(/@[a-zA-Z0-9]+/gi);
  if (users) {
    const test = users.map((user) => user.replace(/@/g, ''));
    const userInfo = await userModel.find({ user_id: { $in: test } });
    userInfo.map(async (user) => {
      await createNotification({ userId: user.get('user_id'), type: 'mention', tweetId, giverId });
    });
  }
};

const addBasicTweet = async (_: any, { content, img_url_list }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!content && !img_url_list) throw new Error('빈 트윗입니다.');

  const userId = authUser.id;
  const newTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list,
    child_tweet_id_list: [],
    retweet_list: [],
    heart_list: [],
  });

  await findMentionUser(content, newTweet.get('_id'), userId);

  return newTweet;
};

const addReplyTweet = async (
  _: any,
  { content, img_url_list, parent_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!parent_id) throw new Error('parent 트윗이 존재하지 않습니다.');

  const userId = authUser.id;
  const replyTweet = await tweetModel.create({
    author_id: userId,
    content,
    img_url_list,
    parent_id,
    child_tweet_id_list: [],
    retweet_list: [],
    heart_list: [],
  });
  const childId = replyTweet?.get('_id');
  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: parent_id },
    { $push: { child_tweet_id_list: childId } },
    { new: true },
  );

  await createNotification({
    userId: parentTweet?.get('author_id'),
    tweetId: childId,
    type: 'reply',
  });

  await findMentionUser(content, replyTweet.get('_id'), userId);

  return replyTweet;
};

const addRetweet = async (_: any, { content, retweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  if (!retweet_id) throw new Error('retweet할 트윗이 존재하지 않습니다.');

  const userId = authUser.id;

  const newRetweet = await tweetModel.create({
    author_id: userId,
    content,
    retweet_id,
    child_tweet_id_list: [],
    retweet_list: [],
    heart_list: [],
  });

  const parentTweet = await tweetModel.findOneAndUpdate(
    { _id: retweet_id },
    { $push: { retweet_user_id_list: userId } },
    { new: true },
  );

  await createNotification({
    userId: parentTweet?.get('author_id'),
    tweetId: newRetweet?.get('_id'),
    type: 'retweet',
  });

  await findMentionUser(content, newRetweet.get('_id'), userId);

  return newRetweet;
};

export { addBasicTweet, addReplyTweet, addRetweet };
