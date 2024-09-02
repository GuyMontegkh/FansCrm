import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from 'src/types/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('add-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  findById(@Param('id') id: string, @Req() req: Request & { user: IUser }) {
    const userId = req.user.id;
    if (+id !== userId) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
    return this.userService.findById(+id);
  }
}
