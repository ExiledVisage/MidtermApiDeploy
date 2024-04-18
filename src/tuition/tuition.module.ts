import { Module } from '@nestjs/common';
import { TuitionService } from './tuition.service';
import { TuitionController } from './tuition.controller';

@Module({
  providers: [TuitionService],
  controllers: [TuitionController]
})
export class TuitionModule {}
