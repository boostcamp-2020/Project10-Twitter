import mongoose from 'mongoose';

const dbStarter = async () => {
  await mongoose.connect('mongodb://101.101.211.65:27017/dev', {
    useNewUrlParser: true,
  });
};

export default dbStarter;
