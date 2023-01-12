import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UserRole } from '@taskforce/shared-types';

const Action = {
  'POST': 'create',
  'DELETE': 'delete',
  'PATCH': 'update'
}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== UserRole.Customer) {
      throw new BadRequestException(`User with role customer only may ${Action[request.method]} task`)
    }

    return true;
  }
}
