import { Controller, Post, Body } from '@nestjs/common';
import { Tuition } from '../entities/tuition.entity';
import { TuitionService } from './tuition.service';

@Controller('tuitions')
export class TuitionController {
  constructor(private readonly tuitionService: TuitionService) {}

  @Post()
  async create(@Body() tuition: Tuition) {
    return this.tuitionService.create(tuition);
  }

}