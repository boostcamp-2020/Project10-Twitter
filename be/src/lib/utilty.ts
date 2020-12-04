import mongoose from 'mongoose';

const makeRandomName = (nameLength: number): string => {
  const result = Math.random().toString(36).substring(nameLength);
  return result;
};

const stringToObjectId = (stringId: string): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId(stringId);
};

export { makeRandomName, stringToObjectId };
