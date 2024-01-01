import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Engagement, News, Repository, RepositoryProvider } from '@database';
import { NewsEntity } from '@entities';
import { Types } from 'mongoose';
import { ActionBy, EntityVisibility, Sorting } from '@common';
import { CreateNews, UpdateNews } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @Inject(RepositoryProvider.NEWS_PROVIDER)
    private readonly newsRepository: Repository<News>,

    @Inject(RepositoryProvider.ENGAGEMENT_PROVIDER)
    private readonly engagementRepository: Repository<Engagement>,
  ) {}

  async create(doc: CreateNews) {
    const created = await this.newsRepository.insertOne(doc);
    return new NewsEntity(created.toJSON());
  }

  async findHighlight() {
    const news = await this.newsRepository.findMany(
      { visibility: EntityVisibility.PUBLISH },
      {},
      { sort: { sequence: Sorting.ASC } },
    );
    return news.map((news) => new NewsEntity(news.toJSON()));
  }

  async findPopular() {
    const popular = await this.engagementRepository.aggregate<{
      _id: Types.ObjectId;
    }>([
      {
        $group: {
          _id: '$refId',
          count: { $sum: 1 },
        },
      },
      {
        $limit: 5,
      },
    ]);

    if (!popular.length) return [];

    const newsIds = popular.map(({ _id }) => _id);

    const news = await this.newsRepository.findMany(
      { visibility: EntityVisibility.PUBLISH, _id: { $in: newsIds } },
      {},
    );

    return news.map((news) => new NewsEntity(news.toJSON()));
  }

  async findLatest() {
    const news = await this.newsRepository.findMany(
      { visibility: EntityVisibility.PUBLISH },
      {},
      { sort: { updatedAt: Sorting.DESC } },
    );
    return news.map((news) => new NewsEntity(news.toJSON()));
  }

  async findOne(id: string) {
    const news = await this.newsRepository.findOne({
      _id: new Types.ObjectId(id),
      visibility: EntityVisibility.PUBLISH,
    });

    if (!news) throw new NotFoundException();

    await this.engagementRepository.insertOne({
      action: ActionBy.VIEW,
      ip: '0.0.0.0', // fix
      refId: new Types.ObjectId(id),
    });

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
