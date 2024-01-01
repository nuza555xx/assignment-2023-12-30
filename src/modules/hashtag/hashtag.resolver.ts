import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HashtagService } from './hashtag.service';
import { CreateHashtag, UpdateHashtag } from './hashtag.dto';
import { HashtagEntity } from '@entities';

@Resolver(() => HashtagEntity)
export class HashtagResolver {
  constructor(private readonly hashtagService: HashtagService) {}

  @Mutation(() => HashtagEntity, { name: 'createHashtag' })
  create(@Args('createHashtag') input: CreateHashtag) {
    return this.hashtagService.create(input);
  }

  @Query(() => [HashtagEntity], { name: 'hashtag' })
  findAll() {
    return this.hashtagService.findAll();
  }

  @Query(() => HashtagEntity, { name: 'hashtagById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.hashtagService.findOne(id);
  }

  @Mutation(() => HashtagEntity, { name: 'updateHashtag' })
  update(@Args('updateHashtag') { id, ...input }: UpdateHashtag) {
    return this.hashtagService.update(id, input);
  }

  // @Mutation(() => hashtag)
  // remove(@Args('id', { type: () => Int }) id: number) {
  //   return this.hashtagService.remove(id);
  // }
}
