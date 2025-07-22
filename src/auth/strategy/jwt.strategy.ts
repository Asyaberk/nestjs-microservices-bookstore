import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
        super({
            //extract token
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.jwt]),
            //the secret we gave before
            secretOrKey: 'cat'
        })
    } 

    //will take the token from the bearer section, 
    //verify it with the secret, 
    //then decode the content and put it into the payload
    async validate(payload: any) {
        const user = await this.repo.findOne({ where: { id: payload.sub } });
        return user;
    }
}