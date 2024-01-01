import { ConfigKey } from '@config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

export const getGraphQLOptions = (config: ConfigService) => {
  return config.get<ApolloDriverConfig>(ConfigKey.GRAPHQL);
};
