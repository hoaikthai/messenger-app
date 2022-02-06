import { PrismaClient } from "@prisma/client"

export const createRoomWithUserIds = (prisma: PrismaClient, userIds: string[]) => {
  return prisma.room.create({
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
}
