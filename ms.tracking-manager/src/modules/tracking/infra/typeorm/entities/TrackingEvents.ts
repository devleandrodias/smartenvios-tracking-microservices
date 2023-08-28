import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Tracking } from "./Tracking";
import { ITrackingEvent } from "../../../entities/ITracking";
import { ESmartEnviosStatus } from "../../../../../shared/enuns/ESmartEnviosStatus";

@Entity("tracking_events")
export class TrackingEvent implements ITrackingEvent {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  status!: ESmartEnviosStatus;

  @Column()
  observation!: string;

  @JoinColumn({ name: "trackingId" })
  @ManyToOne(() => Tracking, (tracking) => tracking.events)
  tracking!: Tracking;
}
