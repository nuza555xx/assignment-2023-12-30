import { Module, Global } from '@nestjs/common';
import { getGraphQLOptions } from './graphql.factory';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule as GraphQLCoreModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Global()
@Module({
  imports: [
    GraphQLCoreModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: getGraphQLOptions,
      inject: [ConfigService],
    }),
  ],
})
export class GraphQLModule {}
