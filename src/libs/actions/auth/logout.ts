"use server"

import { signOut } from "@/libs/auth"

export const logout = async () => {
  await signOut({
    redirect: false
  })
}