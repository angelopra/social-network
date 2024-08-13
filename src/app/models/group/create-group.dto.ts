export interface CreateGroupDto {
  name: string;
  description?: string;
  pictureUrl?: string;
  usersIds?: string[];
  tagsIds?: string[];
}
