import rawDrive from '@/src/data/drive.json'
import type { DriveResource } from '@/types/siteContent'

const resources = rawDrive as DriveResource[]

export function getDriveResources(): DriveResource[] {
  return [...resources].sort((a, b) => a.order - b.order)
}
