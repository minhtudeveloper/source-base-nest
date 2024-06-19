import { Module } from '@nestjs/common';
import { GenKeyService } from './genKey.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GenKeyService],
})
export class GenKeyModule {}
