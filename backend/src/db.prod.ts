import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
dotenv.config()

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, // Assure-toi de convertir en nombre
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, //en dev, en prod on préfera utiliser les migrations
  logging: true,
  entities: [
    'dist/**/category.entity.js',
    'dist/**/material.entity.js',
    'dist/**/user.entity.js',
    'dist/**/reservation_material.entity.js',
    'dist/**/reservation.entity.js',
  ],
})
// Category, Material, ReservationMaterial, User, Reservation
//__dirname + '../dist/src/entities/*.entity.{js,ts}'
// 'dist/src/entities/*.entity.{js,ts}'
// 'dist/**/*.entity.js'
