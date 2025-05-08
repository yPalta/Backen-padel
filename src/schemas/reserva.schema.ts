// src/reservas/schemas/reserva.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservaDocument = Reserva & Document;

@Schema()
export class Reserva {
  @Prop({ required: true })
  nombreSocio: string;

  @Prop({ required: true })
  cancha: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop()
  estado: string; // pendiente, confirmada, cancelada
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
