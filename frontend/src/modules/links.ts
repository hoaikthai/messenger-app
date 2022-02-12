export const getAppLinks = () => {
  const core = {
    home: () => "/",
  }

  const auth = {
    signUp: () => "/sign-up",
    signIn: () => "/sign-in",
    signOut: () => "/sign-out",
  }

  return {
    core,
    auth,
  }
}

export type AppLinks = ReturnType<typeof getAppLinks>
