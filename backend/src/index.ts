import fastify from "fastify"
import fastifyAuth from "fastify-auth"
import fastifyBcrypt from "fastify-bcrypt"
import fastifyCors from "fastify-cors"
import fastifyEnv from "fastify-env"
import fastifyJwt from "fastify-jwt"
import fastifySwagger from "fastify-swagger"
import fastifyIO from "fastify-socket.io"
import { authRoutes } from "./auth"
import { corsOptions } from "./plugins/cors"
import { envOptions } from "./plugins/env"
import { prismaPlugin } from "./plugins/prisma"
import { swaggerOptions } from "./plugins/swagger"
import { SocketEvent } from "./messenger/types/SocketEvent"
import { Message } from "@prisma/client"
import { messagerRoutes } from "./messenger"

const server = fastify({ logger: true })

server.register(fastifyEnv, envOptions).after(() => {
  server.register(fastifyJwt, { secret: server.env.AUTH_SECRET })
})
server.register(prismaPlugin)
server.register(fastifyBcrypt)
server.register(fastifySwagger, swaggerOptions)
server.register(fastifyAuth)
server.register(fastifyCors, corsOptions)
server.register(fastifyIO)

server.register(authRoutes)
server.register(messagerRoutes)

server.ready(() => {
  server.io.on(SocketEvent.Connect, (socket) => {
    console.log("a user connected")
    socket.send("connected")

    socket.on(SocketEvent.Disconnect, () => {
      console.log("a user disconnected")
    })

    socket.on(SocketEvent.Message, (msg: Message) => {
      socket.send(msg)
      console.log("message: " + JSON.stringify(msg))
    })
  })
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
