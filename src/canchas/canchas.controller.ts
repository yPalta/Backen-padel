import { Controller, Get, Query } from '@nestjs/common';
import { CanchasService } from './canchas.service';

@Controller('canchas')
export class CanchasController {
  constructor(private readonly canchasService: CanchasService) {}

  @Get('disponibles')
  async getDisponibles(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    return this.canchasService.obtenerDisponibles(fechaInicio, fechaFin);
  }
}