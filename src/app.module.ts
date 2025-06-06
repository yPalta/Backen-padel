import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasModule } from './reservas/reservas.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/padel'),
    ReservasModule,
  ],
  
})
export class AppModule {}
