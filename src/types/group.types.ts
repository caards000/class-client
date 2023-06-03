export type GroupType = {
  id: number,
  groupName: string,
  slug: string,
  description: string,
  authorUsername: string
}

export type CreateGroupType = {
  groupName: string,
  slug: string,
  description: string
}

