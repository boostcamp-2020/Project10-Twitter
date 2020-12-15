const commonReadCondition = [
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
  {
    $project: {
      _id: 1,
      author_id: 1,
      author: 1,
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
      'retweet._id': 1,
      'retweet.author_id': 1,
      'retweet.author': 1,
      'retweet.content': 1,
      'retweet.parent_id': 1,
      'retweet.retweet_id': 1,
      'retweet.child_tweet_id_list': 1,
      'retweet.img_url_list': 1,
      'retweet.child_user_id_list': 1,
      'retweet.child_tweet_number': {
        $size: { $ifNull: ['$retweet.child_user_id_list', []] },
      },
      'retweet.retweet_user_id_list': 1,
      'retweet.retweet_user_number': {
        $size: { $ifNull: ['$retweet.retweet_user_id_list', []] },
      },
      'retweet.heart_user_id_list': 1,
      'retweet.heart_user_number': {
        $size: { $ifNull: ['$retweet.heart_user_id_list', []] },
      },
      'retweet.createAt': 1,
    },
  },
];

export default commonReadCondition;
