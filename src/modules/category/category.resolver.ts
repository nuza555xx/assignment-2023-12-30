import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategory, UpdateCategory } from './category.dto';
import { CategoryEntity } from '@entities';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryEntity, { name: 'createCategory' })
  create(@Args('createCategory') input: CreateCategory) {
    return this.categoryService.create(input);
  }

  @Query(() => [CategoryEntity], { name: 'category' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryEntity, { name: 'categoryById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryEntity, { name: 'updateCategory' })
  update(@Args('updateCategory') { id, ...input }: UpdateCategory) {
    return this.categoryService.update(id, input);
  }

  // @Mutation(() => Category)
  // removeCategory(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoryService.remove(id);
  // }
}
