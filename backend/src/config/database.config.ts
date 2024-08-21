import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { GoodDeed } from '../good-deeds/entities/good-deed.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, GoodDeed],
    synchronize: false, // Set this to false in production
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
});
