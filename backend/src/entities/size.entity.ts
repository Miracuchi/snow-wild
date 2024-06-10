import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Material from './material.entity'

@ObjectType()
@Entity()
export class Size {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  size: string

  @Field()
  @Column()
  quantity: number

  @ManyToOne(() => Material, (material) => material.sizes, {
    onDelete: 'CASCADE',
  })
  material: Material
}
