import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { GoodDeed } from '../good-deeds/entities/good-deed.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, GoodDeed],
    synchronize: false, // Set this to false in production
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: true, // This will run migrations automatically
    migrationsTableName: 'migrations',
};
