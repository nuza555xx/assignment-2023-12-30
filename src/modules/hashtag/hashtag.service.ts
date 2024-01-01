import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hashtag, Repository, RepositoryProvider } from '@database';
import { HashtagEntity } from '@entities';
import { Types } from 'mongoose';
import { EntityVisibility, Sorting } from '@common';
import { CreateHashtag, UpdateHashtag } from './hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @Inject(RepositoryProvider.HASHTAG_PROVIDER)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async create(doc: CreateHashtag) {
    const created = await this.hashtagRepository.insertOne(doc);
    return new HashtagEntity(created.toJSON());
  }

  async findAll() {
    const categories = await this.hashtagRepository.findMany(
      { visibility: EntityVisibility.PUBLISH },
      {},
      { sort: { sequence: Sorting.ASC } },
    );
    return categories.map((category) => new HashtagEntity(category.toJSON()));
  }

  async findOne(id: string) {
    const category = await this.hashtagRepository.findOne({
      _id: new Types.ObjectId(id),
      visibility: EntityVisibility.PUBLISH,
    });

    if (!category) throw new NotFoundException();

    return new HashtagEntity(category.toJSON());
  }

  async update(id: string, doc: Omit<UpdateHashtag, 'id'>) {
    await this.hashtagRepository.updateById(new Types.ObjectId(id), doc);
    return this.findOne(id);
  }

  // async remove(id: number) {
  //   await this.hashtagRepository.updateById(new Types.ObjectId(id), {
  //     $set: { visibility: EntityVisibility.DELETE },
  //   });
  // }
}
