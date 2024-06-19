import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getENVFile } from './env.config';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenvConfig({ path: getENVFile() });

const config = {
  type: `${process.env.DB_TYPE}`,
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT ?? '5432'}`, 10),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
  entities: [join(__dirname, '../', 'database/*/*.entity.{js,ts}')],
  migrations: [join(__dirname, '../', 'database/migrations/*.{js,ts}')],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions;

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
