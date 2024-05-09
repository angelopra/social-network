import { MessageDto } from "./message.dto";

export interface GroupDto {
  id: number;
  name: string;
  picture: string;
  lastMessage: MessageDto;
}
