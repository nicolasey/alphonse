import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://localhost/alphonse`,
      { useNewUrlParser: true },
    ),
    AuthModule,
    UsersModule,
    CompaniesModule,
    IdeasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
