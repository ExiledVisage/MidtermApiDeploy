import { Controller, Get, Query } from '@nestjs/common';
import { MobileService } from './mobile.service';

@Controller('mobile')
export class MobileController {

    constructor(private readonly mobileService: MobileService) {}

    @Get('tuition')
    async getTuition(@Query('studentNo') studentNo: string) {
      return this.mobileService.queryTuition(studentNo);
    }
}
