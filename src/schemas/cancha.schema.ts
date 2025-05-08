import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CanchaDocument = Cancha & Document;

@Schema()
export class Cancha {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  ubicacion: string;
}

export const CanchaSchema = SchemaFactory.createForClass(Cancha);
