import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserType } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../_guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';

export function Auth(...roles: UserType[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
