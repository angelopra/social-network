import { UserChatDto } from "../chat/user-chat.dto";
import { ResumedUserDto } from "./resumed-user.dto";
import { UserGroupDto } from "../group/user-group.dto";

export interface CurrentUserDto {
  id: string;
  followRequests: {
    ours: ResumedUserDto[];
    theirs: ResumedUserDto[];
  };
  groups: UserGroupDto[];
  chats: UserChatDto[];
}
