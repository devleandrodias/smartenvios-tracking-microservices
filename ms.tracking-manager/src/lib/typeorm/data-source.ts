import { DataSource } from "typeorm";
import { Tracking } from "../../modules/tracking/infra/typeorm/entities/Tracking";
import { TrackingEvent } from "../../modules/tracking/infra/typeorm/entities/TrackingEvents";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "PostgresSmartEnvios!",
  database: "smartenvios",
  synchronize: true,
  logging: true,
  entities: [Tracking, TrackingEvent],
});
