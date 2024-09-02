import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    userPassword: string,
  ): Promise<{ id: any; email: string } | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatch = await argon2.verify(user.password, userPassword);
    if (isPasswordMatch) {
      const result = { id: user.id, email: user.email };
      return result;
    }
    throw new BadRequestException('User or password are incorrect');
  }

  async login(user: IUser) {
    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      id: user.id,
      email: user.email,
      ...tokens,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async validateRefreshToken(userId: number, refreshToken: string): Promise<boolean> {
    const user = await this.userService.findById(userId);

    if (!user || !user.refreshToken) {
      return false;
    }

    return user.refreshToken === refreshToken;
  }

  private async generateTokens(userId: number, email: string) {
    const payload = { id: userId, email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7m' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
