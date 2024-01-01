import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConfigCoreModule } from '@nestjs/config';
import { graphqlConfig, mongooseConfig } from './namespaces';
import { cacheConfig } from './namespaces/cache.config';

@Global()
@Module({
  imports: [
    ConfigCoreModule.forRoot({
      isGlobal: true,
      load: [mongooseConfig, graphqlConfig, cacheConfig],
    }),
  ],
})
export class ConfigModule {}
