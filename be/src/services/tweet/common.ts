const commonReadCondition = [
  {
    $project: {
      author_id: 1,
      content: 1,
      parent_id: 1,
      retweet_id: 1,
      child_tweet_id_list: 1,
      img_url_list: 1,
      child_tweet_number: { $size: '$child_tweet_id_list' },
      retweet_user_id_list: 1,
      retweet_user_number: { $size: '$retweet_user_id_list' },
      heart_user_id_list: 1,
      heart_user_number: { $size: '$heart_user_id_list' },
      createAt: 1,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'author_id',
      foreignField: 'user_id',
      as: 'author',
    },
  },
  { $unwind: '$author' },
  {
    $lookup: {
      from: 'tweets',
      localField: 'retweet_id',
      foreignField: '_id',
      as: 'retweet',
    },
  },
  { $unwind: { path: '$retweet', preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: 'users',
      localField: 'retweet.author_id',
      foreignField: 'user_id',
      as: 'retweet.author',
    },
  },
  { $unwind: { path: '$retweet.author', preserveNullAndEmptyArrays: true } },
];

export default commonReadCondition;
