import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { Admin } from 'src/entities/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() adminData: Admin) {
    return this.adminService.registerAdmin(adminData);
  }

  @Post('login')
  async login(@Body() loginData: { username: string, password: string }) {
    return this.adminService.login(loginData.username, loginData.password);
  }

  @Post('add-tuition/:studentNo/:term')
  @UseGuards(AdminAuthGuard) 
  async addTuition(
    @Param('studentNo') studentNo: string,
    @Param('term') term: string,
  ) {
    return this.adminService.addTuition(studentNo, term);
  }

  @Get('unpaid-tuition/:term')
  @UseGuards(AdminAuthGuard) 
  async unpaidTuition(@Param('term') term: string) {
    return this.adminService.getUnpaidTuition(term);
  }
}
