import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  ITrackingEvent,
  ESmartEnviosStatus,
} from "../../../entities/ITracking";
import { Tracking } from "./Tracking";

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
