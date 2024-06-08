import { PostDto } from './post.dto';

export interface GroupDto {
  id: string;
  name: string;
  picture: string;
  lastPost: PostDto;
}
