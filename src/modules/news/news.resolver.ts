import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { NewsEntity } from '@entities';
import { CreateNews, UpdateNews } from './news.dto';

@Resolver(() => NewsEntity)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => NewsEntity, { name: 'createNews' })
  create(@Args('createNews') input: CreateNews) {
    return this.newsService.create(input);
  }

  @Query(() => [NewsEntity], { name: 'newsHighlight' })
  findHighlight() {
    return this.newsService.findHighlight();
  }

  @Query(() => [NewsEntity], { name: 'newsPopular' })
  findPopular() {
    return this.newsService.findPopular();
  }

  @Query(() => [NewsEntity], { name: 'newsLatest' })
  findLatest() {
    return this.newsService.findLatest();
  }

  @Query(() => NewsEntity, { name: 'newsById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.newsService.findOne(id);
  }

  @Mutation(() => NewsEntity, { name: 'updateNews' })
  update(@Args('updateNews') { id, ...input }: UpdateNews) {
    return this.newsService.update(id, input);
  }

  // @Mutation(() => NewsEntity)
  // remove(@Args('id', { type: () => Int }) id: number) {
  //   return this.newsService.remove(id);
  // }
}
