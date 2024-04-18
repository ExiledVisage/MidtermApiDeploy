import { Controller, Get, Param } from '@nestjs/common';
import { MobileService } from './mobile.service';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get('query-tuition/:studentNo')
  async queryTuition(@Param('studentNo') studentNo: string) {
    return this.mobileService.queryTuition(studentNo);
  }
}
