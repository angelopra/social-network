import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';
import { CHATS_URL } from 'src/app/app.config';
import { UserChatDto } from 'src/app/models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  filter = new FormControl('', { nonNullable: true });
  chats: UserChatDto[] = this.userService.current?.chats ?? [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.filter.valueChanges.subscribe(v => this.chats = (this.userService.current?.chats ?? []).filter(c => (c.otherUser.firstName + c.otherUser.lastName).toLowerCase().includes(v.toLowerCase())));
  }

  navToChat(chat: UserChatDto): void {
    this.router.navigate([CHATS_URL, chat.otherUser.id], { state: { resumedUser: chat.otherUser } });
  }

  displayDate = (chat: UserChatDto): string => {
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
  };
}
