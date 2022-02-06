import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildVerifyJwtDecorator } from "../../auth/decorators/verifyJwt"

export type CreateRoomRequest = {
  userIds: string[]
}

export type CreateRoomResponse = {
  id: string
  users: User[]
}

export type CreateRoomService = { Body: CreateRoomRequest; Reply: CreateRoomResponse }

export const getCreateRoomOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preValidation: fastify.auth([verifyJwt]),
    schema: {
      body: {
        type: "object",
        properties: {
          userIds: { type: "array" },
        },
        required: ["userIds"],
      },
    },
  }
}

export const buildCreateRoomHandler =
  (fastify: FastifyInstance) => async (request: FastifyRequest<CreateRoomService>, reply: FastifyReply) => {
    const { userIds } = request.body

    const room = await fastify.prisma.room.create({
      data: {
        users: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
      select: {
        id: true,
        users: true,
      },
    })

    reply.send(room)
  }
