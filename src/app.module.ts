import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './jwt/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI:', uri);  // Log the MongoDB URI to ensure it is loaded correctly
        return {
          uri: uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,  // Add AuthModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
