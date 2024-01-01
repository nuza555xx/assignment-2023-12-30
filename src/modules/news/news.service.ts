import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { News, Repository, RepositoryProvider } from '@database';
import { NewsEntity } from '@entities';
import { Types } from 'mongoose';
import { EntityVisibility, Sorting } from '@common';
import { CreateNews, UpdateNews } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @Inject(RepositoryProvider.NEWS_PROVIDER)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(doc: CreateNews) {
    const created = await this.newsRepository.insertOne(doc);
    return new NewsEntity(created.toJSON());
  }

  async findAll() {
    const categories = await this.newsRepository.findMany(
      { visibility: EntityVisibility.PUBLISH },
      {},
      { sort: { sequence: Sorting.ASC } },
    );
    return categories.map((news) => new NewsEntity(news.toJSON()));
  }

  async findOne(id: string) {
    const news = await this.newsRepository.findOne({
      _id: new Types.ObjectId(id),
      visibility: EntityVisibility.PUBLISH,
    });

    if (!news) throw new NotFoundException();

    return new NewsEntity(news.toJSON());
  }

  async update(id: string, doc: Omit<UpdateNews, 'id'>) {
    await this.newsRepository.updateById(new Types.ObjectId(id), doc);
    return this.findOne(id);
  }

  // async remove(id: number) {
  //   await this.newsRepository.updateById(new Types.ObjectId(id), {
  //     $set: { visibility: EntityVisibility.DELETE },
  //   });
  // }
}
