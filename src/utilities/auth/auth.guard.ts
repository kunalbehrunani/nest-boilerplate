import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';

export const Roles = (roles: string) => SetMetadata('roles', roles);

export const Public = () => SetMetadata('isPublicUrl', true);

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const skipAuthentication: boolean = this.reflector.get(
      'isPublicUrl',
      context.getHandler(),
    );

    if (skipAuthentication) {
      return true;
    }

    if (!req.headers || !req.headers.authorization) {
      throw new HttpException(
        {
          developerMessage: 'Authorization Header Missing',
          userMessage: 'Invalid Credentials. Please Login Again',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = req.headers.authorization;
    console.log('token: ', token);

    const authData = await this.authService.validateAuthToken({
      authToken: token,
    });

    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles && requiredRoles.includes(Role.ADMIN)) {
      if (authData.role !== Role.ADMIN) {
        throw new HttpException(
          {
            userMessage:
              'You do not have Necessary Permissions for this Request',
            developerMessage:
              'This is Admin Only Request. You Currently do not have Admin Access.',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return true;
  }
}
