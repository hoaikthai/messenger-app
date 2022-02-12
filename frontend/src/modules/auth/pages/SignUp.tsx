import { Button, createStyles, Paper, TextInput, Title } from "@mantine/core"
import { EmptyLayout } from "../layouts/EmptyLayout"

export const SignUp = () => {
  const { classes } = useStyles()

  return (
    <EmptyLayout>
      <Paper className={classes.card}>
        <Title className={classes.title}>Sign Up</Title>
        <TextInput placeholder="noobslayer69" label="Username" required size="md" className={classes.input} />
        <TextInput
          placeholder="********"
          label="Password"
          required
          size="md"
          type="password"
          className={classes.input}
        />
        <Button fullWidth size="md" className={classes.action}>
          Create an account
        </Button>
      </Paper>
    </EmptyLayout>
  )
}

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.lg,
    minWidth: 400,
  },
  title: {
    marginBottom: theme.spacing.xl,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  action: {
    marginTop: 32,
  },
}))
