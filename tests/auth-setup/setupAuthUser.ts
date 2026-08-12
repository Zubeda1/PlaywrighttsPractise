import { test as setup } from '@playwright/test'

import { globalSetup } from './authenticateUser'

import type { User } from './authenticateUser'

const user: User = {
  email: 'testzsh01@dunqa.io',
  handle: '@auth',
  password: 'Dunelm18th88',
  stateFile: 'tests/user.json',
}

setup('setup @auth user', async () => {
  await globalSetup(user)
})