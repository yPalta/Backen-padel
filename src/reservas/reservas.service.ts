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
//se agrego el metodo para crear una reserva y poder confirmarla
  async create(data: Partial<Reserva>) {
    const {cancha, fechaInicio, fechaFin } = data;
    const reservaExistente = await this.reservaModel.findOne({ 
      cancha,
      $or: [
        { fechaInicio: { $lt: fechaFin }, fechaFin: { $gt: fechaInicio } },
      ],
      estado: { $ne: 'cancelada' },
    });

    if (reservaExistente) {
      throw new Error('La cancha ya está reservada en ese rango de fechas.');
    }

    const reserva = new this.reservaModel({
      ...data,    
    estado: 'pendiente', //por defecto
  });

  return reserva.save();

  }

  async confirmarReserva(id: string) {
    const reserva = await this.reservaModel.findById(id);

    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }
    if (reserva.estado === 'confirmada') {
      throw new Error('La reserva ya está confirmada');
    }
    reserva.estado = 'confirmada';
    return reserva.save();
  }
  //fin del metodo para valordar la reserva

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
