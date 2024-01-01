import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Base } from './base.schema';
import { ImageResolution, ImageResolutionSchema } from './image.schema';
import { Meta, MetaSchema } from './meta.schema';

@Schema({ timestamps: true })
export class News extends Base {
  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop({ type: SchemaTypes.String })
  content: string;

  @Prop({ type: ImageResolutionSchema })
  coverImage: ImageResolution;

  @Prop({ type: SchemaTypes.Number })
  sequence: string;

  @Prop({ type: SchemaTypes.String })
  category: string;

  @Prop({ type: [SchemaTypes.String] })
  hashtags: string[];

  @Prop({ type: [ImageResolutionSchema] })
  galleries?: ImageResolution[];

  @Prop({ type: MetaSchema })
  metadata: Meta;

  @Prop({ type: SchemaTypes.String })
  createdBy: string;

  @Prop({ type: SchemaTypes.String })
  updatedBy: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
