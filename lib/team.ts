import rawTeam from '@/data/team.json'

export type PublicTeamMember = {
  name: string
  role: string
  image: string
  initial: string
  linkedinUrl: string | null
  order: number
}

export function getTeamMembers(): PublicTeamMember[] {
  return [...rawTeam].sort((a, b) => a.order - b.order)
}
