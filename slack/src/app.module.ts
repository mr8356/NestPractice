import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DmsModule } from './dms/dms.module';
import { ChannelsModule } from './channels/channels.module';

// ConfigModule
// npm i --save @nestjs/config => .env 파일을 이용하기 위함
// ConfigService
// service에서 constructor로 불러온 후 , configService.get('SECRET')

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DmsModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
