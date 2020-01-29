import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userS: UsersService,
        private readonly jwt: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userS.getUserByEmail(email);

        const check = await this.userS.compareHash(pass, user.password) 
        if(check) {
            user.password = undefined;
            return user;
        }

        return false;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user._id };
        return this.jwt.sign(payload);
    }
}
