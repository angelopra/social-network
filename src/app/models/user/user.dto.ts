import { TagDto } from "../tag/tag.dto";
import { ResumedUserDto } from "./resumed-user.dto";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  about?: string;
  tags: TagDto[];
  followers: ResumedUserDto[];
  followings: ResumedUserDto[];
}
