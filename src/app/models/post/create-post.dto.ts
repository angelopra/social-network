export interface CreatePostDto {
  groupId?: string;
  content: string;
  tagsIds?: string[];
  isPrivate?: boolean;
}
