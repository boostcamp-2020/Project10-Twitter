import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user_id: String,
    tweet_id: Schema.Types.ObjectId,
    follower_id: String,
    type: String,
    is_read: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const notificationModel = mongoose.model('notification', notificationSchema);

export default notificationModel;
