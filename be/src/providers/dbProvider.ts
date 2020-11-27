import mongoose from 'mongoose';

const dbStarter = async () => {
  const CONNECT_URL =
    process.env.NODE_ENV === 'development' ? process.env.DEV_DB_URL : process.env.PRO_DB_URL;
  if (CONNECT_URL === undefined) throw Error('db connection fail');
  await mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};

export default dbStarter;
