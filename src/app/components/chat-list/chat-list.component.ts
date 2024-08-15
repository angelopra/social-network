import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  chats$ = this.chatService.get();
  listOptions: ContentListOptions<any> = {
    image: {
      src: c => c.otherUser.profilePictureUrl,
      alt: c => `${c.otherUser.firstName} ${c.otherUser.lastName}'s picture`,
    },
    title: {
      displayWith: c => `${c.otherUser.firstName} ${c.otherUser.lastName}`,
    },
    date: {
      displayWith: c => c.lastMessage.createdAtUtc,
    },
    content: {
      displayWith: c => (c.lastMessage.received ? '' : '✔✔ ') + c.lastMessage.content,
    },
    onClick: c => this.router.navigate(['/chats', c.id.chatId]),
  };

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) {}
}
