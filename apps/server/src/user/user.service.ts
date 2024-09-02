import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"$%^&@]).*$/;

  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const { email, password } = createUserDto;

    const isExistUser = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (isExistUser) throw new BadRequestException('This email already exists');

    if (!this.passwordRegex.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one lowercase letter, one uppercase letter, and one special character.',
      );
    }

    const hash = await argon2.hash(password);
    const user = await this.userModel.create({
      email: email,
      password: hash,
    });
    if (!user) throw new BadRequestException('Something went wrong');
    const token = this.jwtService.sign({ email: email });
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    return { user: userWithoutPassword, token };
  }

  async findById(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userModel.update({ refreshToken }, { where: { id: userId } });
  }
}
