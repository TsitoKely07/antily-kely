import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { MembershipModule } from './membership/membership.module';
import { MembershipYearModule } from './membership-year/membership-year.module';
import { TerritoryModule } from './territory/territory.module';
import { BranchModule } from './branch/branch.module';
import { MembershipFeeModule } from './membership-fee/membership-fee.module';
import { TerritoryLevelModule } from './territory-level/territory-level.module';
import { RoleModule } from './role/role.module';
import { MembershipPaymentModule } from './membership-payment/membership-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', ''),
        database: config.get<string>('DATABASE_NAME', 'app'),
        entities: [join(__dirname, '**/entities/*.entity{.ts,.js}')],
        synchronize: config.get<string>('NODE_ENV', 'development') !== 'production',
      }),
    }),
    MemberModule,
    MembershipModule,
    MembershipYearModule,
    TerritoryModule,
    BranchModule,
    MembershipFeeModule,
    TerritoryLevelModule,
    RoleModule,
    MembershipPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
