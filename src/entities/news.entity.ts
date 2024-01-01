import { News } from '@database';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ImageDetailEntity {
  @Field(() => String)
  name: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  dimensions: string;
}

@ObjectType()
export class ImageResolutionEntity {
  @Field(() => ImageDetailEntity)
  thumbnail: ImageDetailEntity;

  @Field(() => ImageDetailEntity)
  original: ImageDetailEntity;
}

@ObjectType()
class OgEntity {
  @Field(() => String)
  title: string;

  @Field(() => String)
  keyword: string;

  @Field(() => String)
  description: string;
}

@ObjectType()
export class SeoEntity {
  @Field(() => String)
  title: string;

  @Field(() => String)
  keyword: string;

  @Field(() => String)
  description: string;
}

@ObjectType()
export class MetaEntity {
  @Field(() => SeoEntity)
  seo: SeoEntity;

  @Field(() => OgEntity)
  og: OgEntity;
}

@ObjectType()
export class NewsEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => ImageResolutionEntity)
  coverImage: ImageResolutionEntity;

  @Field(() => Int)
  sequence: number;

  @Field(() => String)
  category: string;

  @Field(() => [String])
  hashtags: string[];

  @Field(() => [ImageResolutionEntity])
  galleries?: ImageResolutionEntity[];

  @Field(() => MetaEntity)
  metadata: MetaEntity;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  createdBy: string;

  @Field(() => String)
  updatedBy: string;

  constructor(partial?: Partial<News>) {
    this.id = partial?._id;
    Object.assign(this, partial);
  }
}
