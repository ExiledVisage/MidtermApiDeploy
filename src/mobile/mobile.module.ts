import { Module } from '@nestjs/common';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuition } from 'src/entities/tuition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tuition])],
  controllers: [MobileController],
  providers: [MobileService]
})
export class MobileModule {}
