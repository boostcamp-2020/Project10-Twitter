import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(__dirname, { extensions: ['gql'] });

const typeDef = mergeTypeDefs(typesArray);

export default typeDef;
