import { Controller, Post, Body, UseGuards, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Res() res, @Body() body: LoginDto) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'No parameters' });
        }

        const user = await this.authService.validateUser(body.email, body.password);

        if (user) {
            const token = await this.authService.login(user);
            return res.status(HttpStatus.OK).json({ user, token });
        }

        return res.status(HttpStatus.FORBIDDEN).json({message: 'NOPE'});
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async getMe(@Req() req) {
        return req.user;
    }
}
