import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false, versionKey: false })
class Og {
  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop({ type: SchemaTypes.String })
  keyword: string;

  @Prop({ type: SchemaTypes.String })
  description: string;
}

const OgSchema = SchemaFactory.createForClass(Og);

@Schema({ _id: false, versionKey: false })
export class Seo {
  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop({ type: SchemaTypes.String })
  keyword: string;

  @Prop({ type: SchemaTypes.String })
  description: string;
}

const SeoSchema = SchemaFactory.createForClass(Seo);

@Schema({ _id: false, versionKey: false })
export class Meta {
  @Prop({ type: SeoSchema })
  seo: Seo;

  @Prop({ type: OgSchema })
  og: Og;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
