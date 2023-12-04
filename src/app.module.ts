import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'foodtography',
            password: 'password',
            database: 'foodtography',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
