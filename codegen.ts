import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_API_URL || "http://localhost:8080/query",
  documents: ['src/graphql/**/**.graphql'],
//   ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/graphql/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;