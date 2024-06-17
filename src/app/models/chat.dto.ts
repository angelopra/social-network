import { LastMessageDto } from "./last-message.dto";
import { ResumedUserDto } from "./resumed-user.dto";

export interface ChatDto {
  id: any;
  otherUser: ResumedUserDto;
  lastMessage: LastMessageDto;
}
