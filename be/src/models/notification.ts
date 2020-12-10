import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user_id: String,
    tweet_id: Schema.Types.ObjectId,
    giver_id: String,
    type: String,
    createAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const notificationModel = mongoose.model('notification', notificationSchema);

export default notificationModel;
