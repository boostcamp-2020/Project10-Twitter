import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    author_id: String,
    content: String,
    img_url_list: [String],
    parent_id: String,
    retweet_id: String,
  },
  { versionKey: false },
);

const tweetModel = mongoose.model('tweet', tweetSchema);

export default tweetModel;
