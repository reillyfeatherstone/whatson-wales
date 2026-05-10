'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/actions/auth/logout'

export default function LogOutButton() {
  return <Button onClick={() => logoutAction()}>Log Out</Button>
}
