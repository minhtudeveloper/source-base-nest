import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import envValidate from './bases/validators/env.validation';
import { appConfig, getENVFile, typeormConfig } from './configs';
import { AuthModule } from './modules/auth/auth/auth.module';
import { UserModule } from './modules/auth/user/user.module';
import { CommanderModule } from './modules/system/commander/commander.module';
import { CronJobModule } from './modules/system/cronJob/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: getENVFile(),
      validate: envValidate,
      load: [appConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('typeorm', {}),
    }),
    AuthModule,
    UserModule,
    CronJobModule,
    CommanderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
