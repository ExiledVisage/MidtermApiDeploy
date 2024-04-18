import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuition } from 'src/entities/tuition.entity';
import { Payment } from 'src/entities/payment.entity';
import { Student } from 'src/entities/student.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Tuition, Payment, Student])],
  controllers: [BankingController],
  providers: [BankingService, JwtService]
})
export class BankingModule {}
