import { Module } from '@nestjs/common';
import { UploadFileController } from './uploads.controller';
import { UploadFileService } from './uploads.service';

@Module({
  imports: [],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
