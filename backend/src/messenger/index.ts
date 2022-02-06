import { FastifyInstance } from "fastify"
import { buildCreateRoomHandler, CreateRoomRequest, CreateRoomResponse, getCreateRoomOptions } from "./createRoom"
import {
  buildGetRoomMessagesHandler,
  getGetRoomMessagesOptions,
  GetRoomMessagesRequest,
  GetRoomMessagesResponse,
} from "./getRoomMessages"
import { buildGetRoomsHandler, getGetRoomsOptions, GetRoomsResponse } from "./getRooms"

export const messagerRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetRoomsResponse }>("/rooms", getGetRoomsOptions(fastify), buildGetRoomsHandler(fastify))
  fastify.post<{ Body: CreateRoomRequest; Reply: CreateRoomResponse }>(
    "/rooms",
    getCreateRoomOptions(fastify),
    buildCreateRoomHandler(fastify)
  )
  fastify.get<{ Params: GetRoomMessagesRequest; Reply: GetRoomMessagesResponse }>(
    "/rooms/:roomId/messages",
    getGetRoomMessagesOptions(fastify),
    buildGetRoomMessagesHandler(fastify)
  )
}
