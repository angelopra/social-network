import { PostDto } from './post.dto';

export interface GroupDto {
  id: number;
  name: string;
  picture: string;
  lastPost: PostDto;
}
