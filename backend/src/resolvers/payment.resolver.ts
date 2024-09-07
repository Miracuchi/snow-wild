import { GraphQLJSON } from 'graphql-scalars'
import { Arg, Field, InputType, Int, Query, Resolver } from 'type-graphql'
import PaymentService from '../services/payment.service'

@InputType()
export class ProductForSessionInput {
  @Field()
  id: string

  @Field(() => Int)
  quantity: number
}
@Resolver()
export default class PaymentResolver {
  @Query(() => GraphQLJSON)
  async createSession(
    @Arg('data', () => [ProductForSessionInput]) data: ProductForSessionInput[],
    @Arg('reservationId') reservationId: string
  ) {
    console.log('DATA', data)

    return await new PaymentService().createSession(data, reservationId)
  }
}
