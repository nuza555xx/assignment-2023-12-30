import { Mongoose } from 'mongoose';
import {
  Category,
  CategorySchema,
  Hashtag,
  HashtagSchema,
  News,
  NewsSchema,
} from '@database';
import { readFileSync } from 'fs';

export class MockService {
  private _connection: Mongoose;
  constructor(private connection: Mongoose) {
    this._connection = this.connection;
  }
  async initialCategory(): Promise<void> {
    const model = this._connection.model(Category.name, CategorySchema);

    const exists = await model.countDocuments({}).exec();
    if (exists) return;

    const category = readFileSync(`${__dirname}/data/category.json`, {
      encoding: 'utf8',
    });
    const categoryParse = JSON.parse(category);
    await model.create(categoryParse);
  }

  async initialHashtag(): Promise<void> {
    const model = this._connection.model(Hashtag.name, HashtagSchema);

    const exists = await model.countDocuments({}).exec();
    if (exists) return;

    const hashtag = readFileSync(`${__dirname}/data/hashtag.json`, {
      encoding: 'utf8',
    });
    const hashtagParse = JSON.parse(hashtag);
    await model.create(hashtagParse);
  }

  async initialNews(): Promise<void> {
    const model = this._connection.model(News.name, NewsSchema);

    const exists = await model.countDocuments({}).exec();
    // if (exists) return;

    const news = readFileSync(`${__dirname}/data/news.json`, {
      encoding: 'utf8',
    });

    console.log(Object.keys(JSON.parse(news)).join(' '));

    // const newsParse = JSON.parse(news);
    // await model.create(newsParse);
  }
}
