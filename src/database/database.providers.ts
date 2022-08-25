import { DataSource } from 'typeorm';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      // You can inject config service to provide dynamic DataSourceOptions
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST, //configService.get('DB_HOST'),
        port: +process.env.DB_PORT, //+configService.get<number>('DB_PORT'),
        username: process.env.DB_USERNAME, //configService.get('DB_USERNAME'),
        password: process.env.DB_PASSWORD, //configService.get('DB_PASSWORD'),
        database: process.env.DB_NAME, //configService.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      });
      try {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
      } catch (error) {
        console.error(error?.message);
      }
      return dataSource;
    },
  },
];
