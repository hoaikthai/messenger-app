import { getAppConfig } from "./config"

const config = getAppConfig()

export const getAppContainer = () => ({
  config,
})
