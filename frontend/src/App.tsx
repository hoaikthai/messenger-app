import { MantineProvider } from "@mantine/core"
import "./App.scss"
import { AppRoutes } from "./modules/routes/AppRoutes"
import { themeExtension } from "./theme"

export const App = () => {
  return (
    <MantineProvider theme={themeExtension}>
      <AppRoutes />
    </MantineProvider>
  )
}
