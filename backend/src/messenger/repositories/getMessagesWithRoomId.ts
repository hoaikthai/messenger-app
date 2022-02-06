import { PrismaClient } from "@prisma/client"

export const getMessagesWithRoomId = (prisma: PrismaClient, roomId: string) => {
  return prisma.message.findMany({
    where: {
      roomId,
    },
    include: {
      sender: true,
    },
  })
}
