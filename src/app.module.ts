import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//引入数据库
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuModule } from './menu/menu.module';
import { StudentModule } from './student/student.module';
import { CommentModule } from './comment/comment.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { RegisterModule } from './register/register.module';
@Module({
  imports: [AuthModule, UsersModule , TypeOrmModule.forRoot({
    type: "mysql", //数据库类型
    username: "root", //账号
    password: "123456", //密码
    host: "localhost", //host
    port: 3306, //
    database: "db", //库名
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件 注释后自动加载实体
    synchronize:true, //synchronize字段代表是否自动将实体类同步到数据库
    retryDelay:500, //重试连接数据库间隔
    retryAttempts:10,//重试连接数据库的次数
    autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }), MenuModule, StudentModule, CommentModule, AnnouncementModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
