import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';
import { CHATS_URL } from 'src/app/app.config';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { UserChatDto } from 'src/app/models';
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
      displayWith: displayDate,
      format: null,
    },
    content: {
      displayWith: c => (c.lastMessage.received ? '' : '✔✔ ') + c.lastMessage.content,
    },
    onClick: c => this.router.navigate([CHATS_URL, c.otherUser.id], { state: { resumedUser: c.otherUser } }),
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  get chats(): UserChatDto[] {
    return this.userService.current?.chats ?? [];
  }
}

function displayDate(chat: UserChatDto): string {
  const date = parseISO(chat.lastMessage.createdAtUtc);
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  if (isThisWeek(date)) {
    return format(date, 'EEEE');
  }
  return format(date, 'P');
}
