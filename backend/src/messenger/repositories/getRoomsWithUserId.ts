import { PrismaClient } from "@prisma/client"

export const getRoomsWithUserId = (prisma: PrismaClient, userId: string) => {
  return prisma.room.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
    },
  })
}
