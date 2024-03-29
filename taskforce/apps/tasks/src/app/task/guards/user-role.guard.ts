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
    const isPerformer = user.role !== UserRole.Customer;

    if (isPerformer && request.route.path === '/api/category') {
      throw new BadRequestException(`User with role customer only may create category`);
    }

    if (!isPerformer && request.route.path === '/api/performer') {
      throw new BadRequestException(`User with role performer only may create respond task`);
    }

    if (
      isPerformer && (
        request.route.path === '/api/task/status/:id' ||
        request.route.path === '/api/task/:id' ||
        request.route.path === '/api/task'
      )
    ) {
      throw new BadRequestException(`User with role customer only may ${Action[request.method]} task`);
    }

    return true;
  }
}
