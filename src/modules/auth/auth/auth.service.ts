import { User } from '@/database/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { createClient } from 'ldapjs';
import { Repository } from 'typeorm';
import { SignInDTO } from './dtos/signIn.dto';
import { SignInResult } from './dtos/signIn.result';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(body: SignInDTO): Promise<SignInResult> {
    const emailDomain = this.configService.get<string>('ldapDomainEMail');

    const { username, password } = body;

    // Get userinfo from db
    const userInfo = await this.userRepo.findOne({
      where: { username: username + `@${emailDomain}` },
    });

    if (!userInfo) throw new UnauthorizedException();

    userInfo.lastLoginAt = new Date(Date.now());
    await this.userRepo.save(userInfo);

    return {
      id: userInfo.id,
      username: userInfo.username,
      lastLoginAt: userInfo.lastLoginAt,
      accessToken: this.jwtService.sign({
        id: userInfo.id,
        username: userInfo.username,
      }),
    };
  }
}
