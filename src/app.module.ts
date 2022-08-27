import { Module } from '@nestjs/common';
import { BkngModule } from './bkng/bkng.module';

@Module({
  imports: [BkngModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
