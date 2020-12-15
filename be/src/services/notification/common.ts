const commonNotificationCondition = [
  {
    $lookup: {
      from: 'tweets',
      localField: 'tweet_id',
      foreignField: '_id',
      as: 'tweet',
    },
  },
  { $unwind: { path: '$tweet', preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: 'users',
      localField: 'tweet.author_id',
      foreignField: 'user_id',
      as: 'tweet.author',
    },
  },
  { $unwind: { path: '$tweet.author', preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: 'users',
      localField: 'giver_id',
      foreignField: 'user_id',
      as: 'giver',
    },
  },
  { $unwind: { path: '$giver', preserveNullAndEmptyArrays: true } },
  {
    $project: {
      _id: 1,
      tweet_id: 1,
      giver_id: 1,
      type: 1,
      createAt: 1,
      giver: 1,
      'tweet._id': 1,
      'tweet.author_id': 1,
      'tweet.author': 1,
      'tweet.content': 1,
      'tweet.parent_id': 1,
      'tweet.retweet_id': 1,
      'tweet.child_tweet_id_list': 1,
      'tweet.img_url_list': 1,
      'tweet.child_user_id_list': 1,
      'tweet.child_tweet_number': {
        $size: { $ifNull: ['$tweet.child_user_id_list', []] },
      },
      'tweet.retweet_user_id_list': 1,
      'tweet.retweet_user_number': {
        $size: { $ifNull: ['$tweet.retweet_user_id_list', []] },
      },
      'tweet.heart_user_id_list': 1,
      'tweet.heart_user_number': {
        $size: { $ifNull: ['$tweet.heart_user_id_list', []] },
      },
      'tweet.createAt': 1,
    },
  },
];

export default commonNotificationCondition;
