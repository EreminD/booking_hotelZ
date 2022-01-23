import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BkngService } from './bkng.service';
import { BkngController } from './bkng.controller';

@Module({
  controllers: [BkngController],
  providers: [BkngService],
  imports: [HttpModule]
})
export class BkngModule {}
