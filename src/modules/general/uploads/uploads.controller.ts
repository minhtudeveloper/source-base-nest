import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiBearerAuth } from '@nestjs/swagger';

@Controller({ path: 'uploads' })
@ApiTags('uploads')
@ApiBearerAuth()
export class UploadFileController {
  constructor() {}
}
