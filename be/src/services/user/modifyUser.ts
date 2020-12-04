import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';
import { createNotifiaction } from '../notification';

interface Auth {
  authUser: { id: string };
}

const followUser = async (
  _: any,
  { follow_user_id }: { follow_user_id: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  if (follow_user_id === userId) throw new Error('not allow follow yourself');

  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { following_id_list: follow_user_id } },
    { new: true },
  );
  await createNotifiaction({ userId: follow_user_id, followerId: userId, type: 'follow' });
  return user;
};

const unfollowUser = async (
  _: any,
  { unfollow_user_id }: { unfollow_user_id: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $pull: { following_id_list: unfollow_user_id } },
    { new: true },
  );
  return user;
};

const updateUserName = async (_: any, { name }: { name: string }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await userModel.update({ user_id: userId }, { $set: { name } });
  return { response: true };
};

const updateUserComment = async (_: any, { comment }: { comment: string }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await userModel.update({ user_id: userId }, { $set: { comment } });
  return { response: true };
};

const updateUserProfileImg = async (
  _: any,
  { profile_img_url }: { profile_img_url: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await userModel.update({ user_id: userId }, { $set: { profile_img_url } });
  return { response: true };
};

const updateUserBackgroundImg = async (
  _: any,
  { background_img_url }: { background_img_url: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await userModel.update({ user_id: userId }, { $set: { background_img_url } });
  return { response: true };
};

export {
  followUser,
  unfollowUser,
  updateUserName,
  updateUserComment,
  updateUserProfileImg,
  updateUserBackgroundImg,
};
