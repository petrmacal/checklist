import express from "express"
import { ApolloServer } from "apollo-server-express"
import { createServer } from "http"
import cors from "cors"
import { schema } from "./schema"

const PORT = process.env.PORT || 3000

const app = express()
app.use("*", cors())

const server = new ApolloServer({
  schema,
})

server.applyMiddleware({ app, path: "/graphql" })
const httpServer = createServer(app)

httpServer.listen({ port: PORT }, (): void =>
  console.log(`Apollo server is running on http://localhost:${3000}/graphql`)
)
