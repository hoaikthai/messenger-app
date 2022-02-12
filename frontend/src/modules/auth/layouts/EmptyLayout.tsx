import { Center, createStyles } from "@mantine/core"
import { ReactNode } from "react"

export type EmptyLayoutProps = {
  children: ReactNode
}

export const EmptyLayout = (props: EmptyLayoutProps) => {
  const { children } = props
  const { classes } = useStyles()

  return <Center className={classes.root}>{children}</Center>
}

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.dark[5],
  },
}))
