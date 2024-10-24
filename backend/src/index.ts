/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import Cookies from 'cookies'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { jwtVerify } from 'jose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import datasource from './db.prod'
import User from './entities/user.entity'
import { customAuthChecker } from './lib/authChecker'
import CategoryResolver from './resolvers/category.resolver'
import MaterialResolver from './resolvers/material.resolver'
import PaymentResolver from './resolvers/payment.resolver'
import ReservationResolver from './resolvers/reservation.resolver'
import ReservationMaterialResolver from './resolvers/reservation_material.resolver'
import UserResolver from './resolvers/user.resolver'
import ReservationService from './services/reservation.service'
import UserService from './services/user.service'
import { StatutReservation } from './types'

export interface MyContext {
  req: express.Request
  res: express.Response
  user?: User | null
}

export interface Payload {
  email: string
  role: string
  userId: string
}

export const app = express()
dotenv.config()
const httpServer = http.createServer(app)
const PORT = Number(process.env.PORT) || 4000
console.log('hello')

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_API_KEY!)

async function main() {
  const schema = await buildSchema({
    resolvers: [
      CategoryResolver,
      MaterialResolver,
      UserResolver,
      ReservationResolver,
      ReservationMaterialResolver,
      PaymentResolver,
    ],
    validate: false,
    authChecker: customAuthChecker,
  })

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  app.post(
    '/webhooks',
    express.raw({ type: 'application/json' }), // Utiliser express.raw pour les webhooks Stripe
    (request, response) => {
      const sig = request.headers['stripe-signature']
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET // Secret de webhook Stripe

      let event
      try {
        // Vérification de la signature du webhook
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        )
      } catch (err) {
        console.error(`⚠️  Erreur de signature du webhook`, err)
        return response.sendStatus(400)
      }

      // Gestion des événements Stripe
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object
          const id = paymentIntent.metadata.reservationId

          new ReservationService().updateReservation(id, {
            status: StatutReservation.PAID,
          })
          console.log('Paiement réussi pour:', paymentIntent.id)
          // Vous pouvez mettre à jour votre base de données ici
          break
        case 'payment_method.attached':
          const paymentMethod = event.data.object
          console.log('Méthode de paiement attachée:', paymentMethod.id)
          break
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      response.json({ received: true })
    }
  )

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: [
        'http://localhost:3000',
        'http://localhost:8000',
        'https://snow-wild.vercel.app/',
      ],
      credentials: true,
    }),

    express.json(),
    // TODO: find how to handle http request + graphql request
    // This line intercept all request and need a token, we should add an exception for our /webhooks route
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null

        const cookies = new Cookies(req, res)
        const token = cookies.get('token')

        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.JWT_SECRET_KEY)
            )
            user = await new UserService().findUserByEmail(verify.payload.email)
            console.log(user)
          } catch (err) {
            console.log(err)
          }
        }
        return { req, res, user }
      },
    })
  )

  await datasource.initialize()
  console.log()

  // await new Promise<void>((resolve) =>
  //   httpServer.listen({ port: PORT }, resolve)
  // )
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  console.log(`🚀 Server lancé sur http://localhost:4000/`)
}

main()
