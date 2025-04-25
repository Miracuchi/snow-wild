import { Field, Float, ID, InputType, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Material from './material.entity'
import Reservation from './reservation.entity'

// =================================================================
//                           OBJECT TYPE
// =================================================================
@ObjectType()
@Entity()
export default class ReservationMaterial {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Reservation)
  @JoinColumn()
  @ManyToOne(() => Reservation, (r) => r.reservationMaterials, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reservation: Reservation

  @Field(() => Material)
  @JoinColumn()
  @ManyToOne(() => Material, (m) => m.reservationMaterials, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  material: Material

  @Field()
  @Column()
  quantity: number

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number // mettre en float

  @Field()
  @Column()
  size: string
}

// =================================================================
//                           INPUT TYPE
// =================================================================
@InputType()
export class CreateReservationMaterialInput {
  @Field(() => Reservation)
  reservation: Reservation // Identifiant de la réservation

  @Field(() => Material)
  material: Material // Identifiant du matériau

  @Field()
  quantity: number // Quantité de matériel réservé

  @Field()
  size: string // Taille de matériel réservé
}

@InputType()
export class UpdateReservationMaterialInput {
  @Field(() => ID)
  id: string

  @Field()
  materialId?: string // Identifiant du matériau

  @Field()
  quantity?: number // Quantité de matériel réservé
}

@InputType()
export class FindReservationMaterialsBetweenTwoDateInput {
  @Field()
  materialId: string

  @Field()
  from_date: Date

  @Field()
  to_date: Date
}
