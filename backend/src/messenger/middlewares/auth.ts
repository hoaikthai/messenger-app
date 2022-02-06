import { Socket } from "socket.io"

export const authMiddleware = (socket: Socket, next: (error?: Error) => void) => {
  if (socket.handshake.auth) {
    next()
  } else {
    next(new Error("Authentication error"))
  }
}
