import { PostDto } from "../post/post.dto";

export interface UserGroupDto {
  id: string;
  name: string;
  pictureUrl?: string;
  lastPost?: PostDto;
  createdAtUtc: Date;
}
