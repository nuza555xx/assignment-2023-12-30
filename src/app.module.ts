import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@interceptor';
import { ConfigModule } from '@config';
import { GraphQLModule } from '@common';
import { DatabaseModule } from '@database';
import { CategoryModule } from '@category';
import { HashtagModule } from '@hashtag';
import { NewsModule } from '@news';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    DatabaseModule,
    NewsModule,
    CategoryModule,
    HashtagModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
