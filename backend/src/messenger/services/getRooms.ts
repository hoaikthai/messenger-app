import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildVerifyJwtDecorator } from "../../auth/decorators/verifyJwt"
import { getRoomsWithUserId } from "../repositories/getRoomsWithUserId"

export type GetRoomsResponse = {
  rooms: {
    id: string
    users: User[]
  }
}

export type GetRoomsService = { Reply: GetRoomsResponse }

export const getGetRoomsOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preValidation: fastify.auth([verifyJwt]),
  }
}

export const buildGetRoomsHandler =
  (fastify: FastifyInstance) => async (request: FastifyRequest<GetRoomsService>, reply: FastifyReply) => {
    const currentUser = request.user as User
    const rooms = getRoomsWithUserId(fastify.prisma, currentUser.id)

    reply.send(rooms)
  }
