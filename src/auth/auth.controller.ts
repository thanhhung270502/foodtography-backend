import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { ResponseObject } from 'src/response/responseObject';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Put('/:id')
    update(@Body() info: User, @Param('id') id: string): Promise<ResponseObject> {
        return this.authService.update(info, id);
    }

    @Get('/:id')
    getUserByID(@Param('id') id: string): Promise<User> {
        return this.authService.getUserByID(id);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<ResponseObject> {
        return this.authService.delete(id);
    }

    @Get('/')
    getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }
}
