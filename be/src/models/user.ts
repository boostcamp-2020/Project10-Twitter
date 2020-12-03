import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: { type: String, unique: true },
    name: String,
    password: String,
    following_id_list: [String],
    comment: String,
    github_id: String,
    profile_img_url: String,
    background_img_url: String,
    heart_tweet_id_list: [mongoose.Types.ObjectId],
  },
  { versionKey: false },
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
