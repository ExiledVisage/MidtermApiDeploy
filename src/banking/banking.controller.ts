import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BankingService } from './banking.service';

@Controller('banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Get('query-tuition/:studentNo')
  async queryTuition(@Param('studentNo') studentNo: string) {
    return this.bankingService.queryTuition(studentNo);
  }

  @Post('pay-tuition')
  async payTuition(@Body() paymentInfo: { studentNo: string, term: string }) {
    const { studentNo, term } = paymentInfo;
    return this.bankingService.payTuition(studentNo, term);
  }
}
