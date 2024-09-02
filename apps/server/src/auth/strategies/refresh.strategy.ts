import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IUser } from 'src/types/user';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'), // Consider using a separate secret for refresh tokens
      passReqToCallback: true,
    });
  }

  async validate(req: Request, user: IUser) {
    const userIdFromToken = user.id;

    const idFromRequest = req.body.userId;

    if (+idFromRequest !== userIdFromToken) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const isValidRefreshToken = await this.authService.validateRefreshToken(user.id, refreshToken);

    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: user.id, email: user.email, refreshToken };
  }
}
