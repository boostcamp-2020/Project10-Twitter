import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user_id: String,
    tweet_id: String,
    follower_id: String,
    type: String,
    is_read: Boolean,
  },
  { versionKey: false },
);

const notificationModel = mongoose.model('notification', notificationSchema);

export default notificationModel;