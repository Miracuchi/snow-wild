import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Material from "./material.entity";
import Reservation from "./reservation.entity";

// =================================================================
//                           OBJECT TYPE
// =================================================================
@ObjectType()
@Entity()
export class ReservationMaterial {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Reservation)
  @JoinColumn()
  @ManyToOne(() => Reservation, (reservation) => reservation.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  reservation: Reservation;

  @Field(() => Material)
  @JoinColumn()
  @ManyToOne(() => Material, (material) => material.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  material: Material;
}

// =================================================================
//                           INPUT TYPE
// =================================================================
@InputType()
export class CreateReservationMaterialInput {
  @Field()
  reservationId: string; // Identifiant de la réservation

  @Field()
  materialId: string; // Identifiant du matériau

  @Field()
  quantity: number; // Quantité de matériel réservé
}
