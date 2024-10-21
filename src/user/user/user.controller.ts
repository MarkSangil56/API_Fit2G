import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('migrate')
  async migrateIdAndUid() {
    await this.userService.migrateIdAndUid();
    return { message: 'Migration completed.' };
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get('first-name/:first_name')
  async getUserByFirstName(@Param('first_name') first_name: string) {
    const user = await this.userService.getUserByFirstName(first_name);
    if (!user) {
      throw new NotFoundException(`User with first name ${first_name} not found`);
    }
    return user;
  }

  @Post(':id/last-contribution')
  async updateLastContribution(
    @Param('id') id: string, 
    @Body() body: { newContribution: number }
  ) {
    const updatedUser = await this.userService.updateLastContribution(id, body.newContribution);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID or UID ${id} not found`);
    }
    return updatedUser;
  }
}
  