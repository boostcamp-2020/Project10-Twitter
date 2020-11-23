import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: String,
    password: String,
    following_list: [String],
    comment: String,
    profile_img_url: String,
    background_img_url: String,
  },
  { versionKey: false },
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
