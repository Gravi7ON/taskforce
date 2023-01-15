import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UserRole } from '@taskforce/shared-types';

@Injectable()
export class OnlyCustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isCustomer = user.role === UserRole.Customer;

    if (!isCustomer) {
      throw new BadRequestException(`User with role customer only may create review`);
    }

    return true;
  }
}
