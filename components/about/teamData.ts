export type TeamMember = {
  name: string
  role: string
  image: string
  linkedin: string
  description?: string
}

// Intentionally empty until the club's approved board information is available.
// Add real names, portraits, and LinkedIn URLs here without changing the page.
export const team: TeamMember[] = [
  { name: '', role: 'President', image: '', linkedin: '' },
  { name: '', role: 'Vice-President', image: '', linkedin: '' },
  { name: '', role: 'General Secretary', image: '', linkedin: '' },
]
