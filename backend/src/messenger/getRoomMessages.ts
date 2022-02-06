import { Message, User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildVerifyJwtDecorator } from "../auth/decorators/verifyJwt"

export type GetRoomMessagesRequest = {
  roomId: string
}

export type GetRoomMessagesResponse = {
  messages: (Message & {
    sender: User
  })[]
}

export const getGetRoomMessagesOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preValidation: fastify.auth([verifyJwt]),
  }
}

export const buildGetRoomMessagesHandler =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: GetRoomMessagesRequest; Reply: GetRoomMessagesResponse }>,
    reply: FastifyReply
  ) => {
    const { roomId } = request.params
    const messages = await fastify.prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        sender: true,
      },
    })

    reply.send({ messages })
  }
