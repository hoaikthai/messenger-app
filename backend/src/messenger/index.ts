import { FastifyInstance } from "fastify"
import { buildCreateRoomHandler, CreateRoomService, getCreateRoomOptions } from "./services/createRoom"
import {
  buildGetRoomMessagesHandler,
  getGetRoomMessagesOptions,
  GetRoomMessagesService,
} from "./services/getRoomMessages"
import { buildGetRoomsHandler, getGetRoomsOptions, GetRoomsService } from "./services/getRooms"

export const messagerRoutes = async (fastify: FastifyInstance) => {
  fastify.get<GetRoomsService>("/rooms", getGetRoomsOptions(fastify), buildGetRoomsHandler(fastify))
  fastify.post<CreateRoomService>("/rooms", getCreateRoomOptions(fastify), buildCreateRoomHandler(fastify))
  fastify.get<GetRoomMessagesService>(
    "/rooms/:roomId/messages",
    getGetRoomMessagesOptions(fastify),
    buildGetRoomMessagesHandler(fastify)
  )
}
