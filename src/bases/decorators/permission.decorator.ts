import {
  PermissionActionKey,
  PermissionModuleKey,
} from '@/helpers/permission.enum';
import { SetMetadata } from '@nestjs/common';

export interface PermissionMetadata {
  moduleKey: PermissionModuleKey;
  actions: PermissionActionKey[];
}

export const PERMISSION_KEY = 'permission_key';
export const Permission = (metadata: PermissionMetadata) =>
  SetMetadata(PERMISSION_KEY, metadata);
