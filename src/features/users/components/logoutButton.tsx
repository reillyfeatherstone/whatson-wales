'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/features/users/server/actions/logout'

export default function LogOutButton() {
  return <Button onClick={() => logoutAction()}>Log Out</Button>
}
