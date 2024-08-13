import { ResumedUserDto } from "../user/resumed-user.dto";

export interface PostDto {
  id: string;
  createdAtUtc: Date;
  author: ResumedUserDto;
  content: string;
  tags: string[];
}
