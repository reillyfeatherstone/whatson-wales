'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/app/(frontend)/account/(auth)/actions'

export default function LogOutButton() {
  return <Button onClick={() => logoutAction()}>Log Out</Button>
}
