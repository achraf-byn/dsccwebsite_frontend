import { clubData } from './club'

export const socialUrls = {
  ...clubData.socials,
  email: clubData.email,
} as const
