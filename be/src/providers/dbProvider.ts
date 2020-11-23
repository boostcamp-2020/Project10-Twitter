import mongoose from 'mongoose';
import { userModel, tweetModel, notificationModel } from '../models';

const dbStarter = async () => {
  await mongoose.connect('mongodb://101.101.211.65:27017/dev', {
    useNewUrlParser: true,
  });
  userModel;
  tweetModel;
  notificationModel;
};

export default dbStarter;
