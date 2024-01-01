import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false, versionKey: false })
class ImageDetail {
  @Prop({ type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.String })
  key: string;

  @Prop({ type: SchemaTypes.String })
  dimensions: string;
}

@Schema({ _id: false, versionKey: false })
export class ImageResolution {
  @Prop({ type: ImageDetail })
  thumbnail: ImageDetail;

  @Prop({ type: ImageDetail })
  original: ImageDetail;
}

export const ImageResolutionSchema =
  SchemaFactory.createForClass(ImageResolution);
