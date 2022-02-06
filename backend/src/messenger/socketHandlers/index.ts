import { Message, User } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { Socket } from "socket.io"
import { authMiddleware } from "../middlewares/auth"
import { SocketEvent } from "../types/SocketEvent"

export const buildSocketHandler = (fastify: FastifyInstance) => {
  fastify.io.use(authMiddleware)

  let users: User[] = []

  fastify.io.on(SocketEvent.Connect, async (socket: Socket) => {
    users.push(socket.handshake.auth as User)
    socket.emit(SocketEvent.OnlineUsersChange, users)

    const rooms = await fastify.prisma.room.findMany({
      where: {
        users: {
          some: {
            id: socket.handshake.auth.id,
          },
        },
      },
    })
    rooms.forEach((room) => socket.join(room.id))

    socket.on(SocketEvent.Disconnect, () => {
      users = users.filter((user) => user.id !== socket.handshake.auth.id)
      socket.emit(SocketEvent.OnlineUsersChange, users)
      rooms.forEach((room) => socket.leave(room.id))
    })

    socket.on(SocketEvent.Message, async (message: Message, roomId: string) => {
      const messageRecord = await fastify.prisma.message.create({
        data: {
          content: message.content,
          senderId: socket.handshake.auth.id,
          roomId,
        },
      })

      if (messageRecord) socket.to(roomId).emit(SocketEvent.Message, message, roomId)
    })
  })
}
