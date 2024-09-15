import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: String, default: 'system' })
  createdBy?: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;

  @Prop({ type: String, default: 'system' })
  updatedBy?: string;

}
