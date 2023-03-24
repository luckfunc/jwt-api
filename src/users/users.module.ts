import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterModule } from 'src/register/register.module';
@Module({
  imports: [RegisterModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
