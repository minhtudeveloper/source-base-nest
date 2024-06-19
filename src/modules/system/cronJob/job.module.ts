import { Module } from '@nestjs/common';
import { CronJobService } from './job.service';

@Module({
  imports: [],
  providers: [CronJobService],
})
export class CronJobModule {}
