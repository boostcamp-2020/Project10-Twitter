import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    author_id: String,
    content: String,
    img_url_list: [String],
    parent_id: Schema.Types.ObjectId,
    retweet_id: Schema.Types.ObjectId,
    child_tweet_id_list: [Schema.Types.ObjectId],
    retweet_user_id_list: [String],
    heart_user_id_list: [String],
    createAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const tweetModel = mongoose.model('tweet', tweetSchema);

export default tweetModel;
