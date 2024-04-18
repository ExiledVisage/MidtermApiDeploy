import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add-tuition/:studentNo/:term')
  async addTuition(
    @Param('studentNo') studentNo: string,
    @Param('term') term: string,
  ) {
    return this.adminService.addTuition(studentNo, term);
  }

  @Get('unpaid-tuition/:term')
  async unpaidTuition(@Param('term') term: string) {
    return this.adminService.getUnpaidTuition(term);
  }
}
