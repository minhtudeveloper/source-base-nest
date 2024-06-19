import { PermissionGuard } from '@/bases/guards/permission.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'users' })
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class UserController {
  constructor() {}

  @Get('me')
  getMe() {}
}
