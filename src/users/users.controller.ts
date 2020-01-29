import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserInterface } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res) {
    const users = await this.usersService.getUsers();
    users.forEach(user => {
      user.password = undefined
    })
    return res.status(HttpStatus.OK).json(users);
  }

  // findOne(@Param('id') id: string):  UsersDto {
  @Get('/:id')
  async getUser(@Res() res, @Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    const result = this.hideFields(user, 'password')
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  async createUsers(@Res() res, @Body() user: UserCreateDto) {
    const newUser = await this.usersService.createUser(user);
    const result = this.hideFields(newUser, 'password')
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('/:id')
  async updateUsers(@Res() res, @Body() user: UserInterface) {
    const updatedUser = await this.usersService.updateUser(user);
    const result = this.hideFields(updatedUser, 'password')
    return res.status(HttpStatus.OK).json(result);
  }

  /**
   * Delete an user
   * @param id string
   */
  @Delete()
  async deleteUsers(@Res() res, @Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return res.status(HttpStatus.OK);
  }

  private hideFields(model: any, ...field: string[]) {
    field.forEach(element => { 
      model[element] = undefined;
    });
    return model
  }
}
