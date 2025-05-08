// src/reservas/reservas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva, ReservaDocument } from '../schemas/reserva.schema';

@Injectable()
export class ReservasService {
  constructor(
    @InjectModel(Reserva.name) private reservaModel: Model<ReservaDocument>,
  ) {}

  create(data: Partial<Reserva>) {
    const reserva = new this.reservaModel(data);
    return reserva.save();
  }

  findAll() {
    return this.reservaModel.find().exec();
  }

  findOne(id: string) {
    return this.reservaModel.findById(id).exec();
  }

  update(id: string, data: Partial<Reserva>) {
    return this.reservaModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.reservaModel.findByIdAndDelete(id).exec();
  }
}
