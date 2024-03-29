import { Message, User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildVerifyJwtDecorator } from "../../auth/decorators/verifyJwt"
import { getMessagesWithRoomId } from "../repositories/getMessagesWithRoomId"

export type GetRoomMessagesRequest = {
  roomId: string
}

export type GetRoomMessagesResponse = {
  messages: (Message & {
    sender: User
  })[]
}

export type GetRoomMessagesService = { Params: GetRoomMessagesRequest; Reply: GetRoomMessagesResponse }

export const getGetRoomMessagesOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preValidation: fastify.auth([verifyJwt]),
  }
}

export const buildGetRoomMessagesHandler =
  (fastify: FastifyInstance) => async (request: FastifyRequest<GetRoomMessagesService>, reply: FastifyReply) => {
    const { roomId } = request.params
    const messages = getMessagesWithRoomId(fastify.prisma, roomId)

    reply.send({ messages })
  }
