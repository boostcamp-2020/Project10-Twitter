import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(__dirname, { extensions: ['ts'] });

const resolvers = mergeResolvers(resolversArray);
export default resolvers;
