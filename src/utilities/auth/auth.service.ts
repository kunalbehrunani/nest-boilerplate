import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from './auth.guard';

@Injectable()
export class AuthService {
  async validateAuthToken(param: {
    authToken: string;
  }): Promise<{ role: Role }> {
    if (param.authToken === 'AN_ADMIN_TOKEN') {
      return {
        role: Role.ADMIN,
      };
    } else if (param.authToken === 'AN_USER_TOKEN') {
      return {
        role: Role.USER,
      };
    }
    throw new HttpException(
      {
        userMessage: 'You are not authorised for this request.',
        developerMessage: 'Invalid Auth Token.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
