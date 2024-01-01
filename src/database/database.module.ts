import { Global, Module } from '@nestjs/common';
import {
  Category,
  CategorySchema,
  Hashtag,
  HashtagSchema,
  News,
  NewsSchema,
} from './schemas';
import { MongooseModule } from '@common';
import { RepositoryProvider } from './database.enum';
import { CategoryImpl, HashtagImpl, NewsImpl } from './implements';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Hashtag.name,
        schema: HashtagSchema,
      },
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: RepositoryProvider.CATEGORY_PROVIDER,
      useClass: CategoryImpl,
    },
    {
      provide: RepositoryProvider.HASHTAG_PROVIDER,
      useClass: HashtagImpl,
    },
    {
      provide: RepositoryProvider.NEWS_PROVIDER,
      useClass: NewsImpl,
    },
  ],
  exports: [
    RepositoryProvider.CATEGORY_PROVIDER,
    RepositoryProvider.HASHTAG_PROVIDER,
    RepositoryProvider.NEWS_PROVIDER,
  ],
})
export class DatabaseModule {}
