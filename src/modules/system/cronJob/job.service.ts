import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronJobService implements OnModuleInit {
  onModuleInit() {
    //init job
  }

  constructor() {}

  // cron job every day
  @Cron('1 0 * * *')
  async cronJobOneDay() {}
}
