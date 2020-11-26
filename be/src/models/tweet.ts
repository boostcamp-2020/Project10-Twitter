import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    author_id: String,
    content: String,
    img_url_list: [String],
    parent_id: Schema.Types.ObjectId,
    retweet_id: Schema.Types.ObjectId,
    child_tweet_list: [Schema.Types.ObjectId],
    child_tweet_number: Number,
  },
  { versionKey: false },
);

const tweetModel = mongoose.model('tweet', tweetSchema);

export default tweetModel;
