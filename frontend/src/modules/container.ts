import { getAppConfig } from "./config"
import { getAppLinks } from "./links"

const config = getAppConfig()

const links = getAppLinks()

export const getAppContainer = () => ({
  config,
  links,
})
