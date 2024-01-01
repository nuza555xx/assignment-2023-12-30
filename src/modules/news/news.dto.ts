import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
class ImageDetail {
  @Field(() => String)
  name: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  dimensions: string;
}

@InputType()
class ImageResolution {
  @Field(() => ImageDetail)
  thumbnail: ImageDetail;

  @Field(() => ImageDetail)
  original: ImageDetail;
}

@InputType()
class Og {
  @Field(() => String)
  title: string;

  @Field(() => String)
  keyword: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class Seo {
  @Field(() => String)
  title: string;

  @Field(() => String)
  keyword: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class Meta {
  @Field(() => Seo)
  seo: Seo;

  @Field(() => Og)
  og: Og;
}

@InputType()
export class CreateNews {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => ImageResolution)
  coverImage: ImageResolution;

  @Field(() => Int)
  sequence: number;

  @Field(() => String)
  category: string;

  @Field(() => [String])
  hashtags: string[];

  @Field(() => [ImageResolution])
  galleries?: ImageResolution[];

  @Field(() => Meta)
  metadata: Meta;

  @Field(() => String)
  createdBy: string;

  @Field(() => String)
  updatedBy: string;
}

@InputType()
export class UpdateNews extends PartialType(CreateNews) {
  @Field(() => String)
  id: string;
}

@InputType()
export class UpdateView {
  @Field(() => String)
  action: string;

  @Field(() => String)
  ip?: string;
}
