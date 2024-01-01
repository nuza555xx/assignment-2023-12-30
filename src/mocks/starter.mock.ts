import { connect } from 'mongoose';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { MockService } from './mock';
config();
(async () => {
  try {
    const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    const connection = await connect(uri, {
      dbName: process.env.DB_DATABASE_NAME,
    });

    const mockInstant = new MockService(connection);
    await Promise.all([
      mockInstant.initialCategory(),
      mockInstant.initialHashtag(),
      mockInstant.initialNews(),
    ]);
  } catch (error) {
    Logger.error('Error connecting to MongoDB:', error);
  } finally {
    process.exit(0);
  }
})();
