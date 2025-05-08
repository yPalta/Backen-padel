import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cancha, CanchaDocument } from '../schemas/cancha.schema';
import { Reserva, ReservaDocument } from '../schemas/reserva.schema';

@Injectable()
export class CanchasService {
  constructor(
    @InjectModel(Cancha.name) private canchaModel: Model<CanchaDocument>,
    @InjectModel(Reserva.name) private reservaModel: Model<ReservaDocument>,
  ) {}

  async obtenerDisponibles(fechaInicio: Date, fechaFin: Date) {
    const reservas = await this.reservaModel.find({
      $or: [
        { fechaInicio: { $lt: fechaFin }, fechaFin: { $gt: fechaInicio } },
      ],
    });

    const canchasOcupadas = reservas.map(r => r.cancha);

    const canchasDisponibles = await this.canchaModel.find({
      nombre: { $nin: canchasOcupadas },
    });

    return canchasDisponibles;
  }
}