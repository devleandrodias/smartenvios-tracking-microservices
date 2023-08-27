import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ITracking, ITrackingEvent } from "../../../entities/ITracking";
import { TrackingEvent } from "./TrackingEvents";

@Entity("trackings")
export class Tracking implements ITracking {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  shippingCompany!: string;

  @Column()
  trackingCode!: string;

  @OneToMany(() => TrackingEvent, (event) => event.tracking)
  events!: TrackingEvent[];
}
