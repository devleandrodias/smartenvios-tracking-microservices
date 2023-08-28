import { DataSource } from "typeorm";

import { envs } from "../../config/env.config";
import { Tracking } from "../../modules/tracking/infra/typeorm/entities/Tracking";
import { TrackingEvent } from "../../modules/tracking/infra/typeorm/entities/TrackingEvents";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.databaseHost,
  port: envs.databasePort,
  username: envs.databaseUsername,
  password: envs.databasePassword,
  database: envs.databaseDatabase,
  synchronize: true,
  logging: true,
  entities: [Tracking, TrackingEvent],
});
