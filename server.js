import fs from 'fs'
import express from 'express'
import Schema from './data/schema'
import GraphQLHTTP from 'express-graphql'
import { MongoClient } from 'mongodb'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'

const app = express()

app.use(express.static('public'))

console.log(process.env.MONGO_URL)
;(async () => {
  const db = await MongoClient.connect(process.env.MONGO_URL)
  const schema = Schema(db)

  app.use(
    '/graphql',
    GraphQLHTTP({
      schema,
      graphiql: true,
    })
  )

  app.listen(3000, () => console.log('listening on port 3000'))

  // Generate schema.json
  const json = await graphql(schema, introspectionQuery)

  fs.writeFile(
    './data/schema.json',
    JSON.stringify(json, null, 2),
    err => {
      if (err) throw err

      console.log('JSON schema created')
    }
  )
})()
