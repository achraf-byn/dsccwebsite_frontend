import rawTeam from '@/src/data/team.json'

export type PublicTeamMember = {
  id: number
  name: string
  role: string
  image: string | null
  linkedin: string | null
  order: number
}

export function getTeamMembers(): PublicTeamMember[] {
  const members: PublicTeamMember[] = rawTeam
  return [...members].sort((a, b) => a.order - b.order || a.id - b.id)
}
