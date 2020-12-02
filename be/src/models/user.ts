import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: String,
    name: String,
    password: String,
    following_list: [String],
    comment: String,
    github: String,
    profile_img_url: String,
    background_img_url: String,
    heart_tweet_list: [mongoose.Types.ObjectId],
  },
  { versionKey: false },
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
