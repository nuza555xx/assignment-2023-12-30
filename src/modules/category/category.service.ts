import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategory, UpdateCategory } from './category.dto';
import { Category, Repository, RepositoryProvider } from '@database';
import { CategoryEntity } from '@entities';
import { Types } from 'mongoose';
import { EntityVisibility, Sorting } from '@common';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(RepositoryProvider.CATEGORY_PROVIDER)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(doc: CreateCategory) {
    const created = await this.categoryRepository.insertOne(doc);
    return new CategoryEntity(created.toJSON());
  }

  async findAll() {
    const categories = await this.categoryRepository.findMany(
      { visibility: EntityVisibility.PUBLISH },
      {},
      { sort: { sequence: Sorting.ASC } },
    );
    return categories.map((category) => new CategoryEntity(category.toJSON()));
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      _id: new Types.ObjectId(id),
      visibility: EntityVisibility.PUBLISH,
    });

    if (!category) throw new NotFoundException();

    return new CategoryEntity(category.toJSON());
  }

  async update(id: string, doc: Omit<UpdateCategory, 'id'>) {
    await this.categoryRepository.updateById(new Types.ObjectId(id), doc);
    return this.findOne(id);
  }

  // async remove(id: number) {
  //   await this.categoryRepository.updateById(new Types.ObjectId(id), {
  //     $set: { visibility: EntityVisibility.DELETE },
  //   });
  // }
}
