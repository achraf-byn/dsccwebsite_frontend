import rawClub from '@/src/data/club.json'

export type ClubData = {
  name: string
  shortName: string
  school: string
  email: string
  description: string
  socials: {
    instagram: string
    linkedin: string
    tiktok: string
    x: string
  }
}

export const clubData: ClubData = rawClub

export function getClubData(): ClubData {
  return clubData
}
