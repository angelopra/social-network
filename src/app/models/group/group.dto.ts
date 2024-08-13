import { GroupUserDto } from "../user/group-user.dto";

export interface GroupDto {
  id: string;
  name: string;
  description?: string;
  pictureUrl?: string;
  createdAtUtc: Date;
  users: GroupUserDto[];
  tags: string[];
}
