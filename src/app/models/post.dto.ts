export interface PostDto {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  content: string;
  createdAt: Date;
  tags?: string[];
}
