import type { DataSource } from 'typeorm'
let datasource: DataSource

if (process.env.NODE_ENV === 'production') {
  // Importer db.prod uniquement en production
  datasource = require('./db.prod').default
} else {
  // Importer db en développement
  datasource = require('./db').default
}

export default datasource
