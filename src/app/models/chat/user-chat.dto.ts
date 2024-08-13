import { ObjectId } from "../common/object-id";
import { ResumedUserDto } from "../user/resumed-user.dto";
import { MessageDto } from "./message.dto";

export interface UserChatDto {
  id: ObjectId;
  otherUser: ResumedUserDto;
  lastMessage: MessageDto;
}
