import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigKey } from '../config.enum';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export const graphqlConfig = registerAs(
  ConfigKey.GRAPHQL,
  (): ApolloDriverConfig => {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.GRAPHQL_IS_PLAYGROUND == '1',
      sortSchema: process.env.GRAPHQL_IS_SORT_SCHEMA == '1',
      path: process.env.GRAPHQL_PATH || 'graphql',
    };
  },
);
