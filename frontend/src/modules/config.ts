export type AppConfig = ReturnType<typeof getAppConfig>

export const getAppConfig = () => {
  return {
    apiUrl: process.env.AUTH_API_ENDPOINT!,
  }
}
