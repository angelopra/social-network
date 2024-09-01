import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isToday, parseISO } from 'date-fns';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserChatDto } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  listOptions: ContentListOptions<UserChatDto> = {
    image: {
      src: c => c.otherUser.profilePictureUrl ?? 'assets/img/default-profile.jpg',
      alt: c => `${c.otherUser.firstName} ${c.otherUser.lastName}'s picture`,
    },
    title: {
      displayWith: c => `${c.otherUser.firstName} ${c.otherUser.lastName}`,
    },
    date: {
      displayWith: c => parseISO(c.lastMessage.createdAtUtc),
      format: getDateFormat,
    },
    content: {
      displayWith: c => (c.lastMessage.received ? '' : '✔✔ ') + c.lastMessage.content,
    },
    onClick: c => this.router.navigate(['/chats', c.otherUser.id], { state: { resumedUser: c.otherUser } }),
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  get chats(): UserChatDto[] {
    return this.userService.current?.chats ?? [];
  }
}

function getDateFormat(chat: UserChatDto): string {
  if (isToday(parseISO(chat.lastMessage.createdAtUtc))) {
    return 'HH:mm';
  }
  return 'shortDate';
}
