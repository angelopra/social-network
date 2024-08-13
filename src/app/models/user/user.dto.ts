import { ResumedUserDto } from "./resumed-user.dto";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  about?: string;
  tags: string[];
  followers: ResumedUserDto[];
  followings: ResumedUserDto[];
}
