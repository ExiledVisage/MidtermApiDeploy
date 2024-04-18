import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileModule } from './mobile/mobile.module';
import { AdminModule } from './admin/admin.module';
import { BankingModule } from './banking/banking.module';

@Module({
  imports: [MobileModule, AdminModule, BankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
