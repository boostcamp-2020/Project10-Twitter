import { IResolvers } from 'apollo-server-express';
import { imgUpload } from '../services';

const fileResolvers: IResolvers = {
  Query: {
    upload_images: (parent: any, args: any) => {},
  },
  Mutation: {
    single_upload: imgUpload,
  },
};

export default fileResolvers;
