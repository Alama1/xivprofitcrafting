import * as dotenv from 'dotenv';
import * as path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const dotenvPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: dotenvPath });
const baseConfig = {
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
};

const extraOption =
  process.env.NODE_ENV === 'production'
    ? {
        ...baseConfig,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : baseConfig;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.DB_INIT === 'true',
  migrationsRun: false,
  extra: extraOption,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
