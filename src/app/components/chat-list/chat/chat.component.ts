import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { compareAsc, format, isSameDay, parseISO } from 'date-fns';
import { groupBy } from 'lodash-es';
import { map, switchMap } from 'rxjs';
import { MessageDto, ResumedUserDto, UserChatDto } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';

const scrollThreshold = 150;

type GroupedMessages = { messages: MessageDto[], date: Date }[];

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesDiv') messagesDiv?: ElementRef;

  groupedMessages: GroupedMessages = [];
  messageForm = new FormControl('');
  receiver?: ResumedUserDto;
  isFarFromBottom = false;
  needsScroll = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
  ) {
    this.route.data.pipe(
      map(({ receiver }) => {
        this.receiver = receiver as ResumedUserDto;
        return this.receiver;
      }),
      switchMap(r => chatService.getMessages(r.id))
    ).subscribe(messages => {
      this.groupedMessages = this.groupMessagesByDate(messages);
      setTimeout(() => this.scrollToBottom());
    });

    chatService.newMessages.subscribe(newMessage => {
      this.pushMessage({
        content: newMessage.message,
        received: newMessage.senderId === this.receiver?.id,
        createdAtUtc: (new Date()).toISOString(),
      });
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isFarFromBottom && this.needsScroll) {
      this.scrollToBottom();
    }
    this.needsScroll = false;
  }

  @HostListener('window:scroll')
  setIsFarFromBottom(): void {
    this.isFarFromBottom = window.innerHeight + window.scrollY + scrollThreshold < this.messagesDiv?.nativeElement.offsetHeight;
  }

  sendMessage() {
    if (!this.receiver) {
      throw new Error("receiver should be defined");
    }

    const newMessage = this.messageForm.getRawValue()?.trim();

    if (newMessage) {
      this.chatService.send(this.receiver.id, newMessage);

      const newMessageDto: MessageDto = {
        content: newMessage,
        received: false,
        createdAtUtc: (new Date()).toISOString(),
      };

      this.pushMessage(newMessageDto);
      
      const chatDoesntExist = !this.userService.current?.chats.some(c => c.otherUser.id === this.receiver?.id);
      if (chatDoesntExist) {
        const newChat: UserChatDto = {
          id: {
            timestamp: Date.now(),
            creationTime: new Date(),
          },
          otherUser: this.receiver,
          lastMessage: newMessageDto,
        };

        this.userService.current?.chats.unshift(newChat);
      }
    }
    
    this.messageForm.reset();
  }

  scrollToBottom(behavior?: ScrollBehavior): void {
    window.scroll({
      top: this.messagesDiv?.nativeElement.offsetHeight,
      behavior,
    });
  }

  private pushMessage(message: MessageDto): void {
    const messageDate = parseISO(message.createdAtUtc);
    const group = this.groupedMessages.find(g => isSameDay(g.date, messageDate));

    if (group) {
      group.messages.push(message);
      group.messages.sort((a, b) => compareAsc(parseISO(a.createdAtUtc), parseISO(b.createdAtUtc)))
    } else {
      this.groupedMessages.push({ date: parseISO(format(messageDate, 'yyyy-MM-dd')), messages: [message] });
      this.groupedMessages.sort((a, b) => compareAsc(a.date, b.date));
    }

    setTimeout(() => {
      this.setIsFarFromBottom();
      this.needsScroll = true;
    });
  }

  private groupMessagesByDate(messages: MessageDto[]): GroupedMessages {
    return Object.entries(groupBy(messages, m => format(parseISO(m.createdAtUtc), 'yyyy-MM-dd'))).map(([dateStr, messages]) => ({
      date: parseISO(dateStr),
      messages,
    }));
  }
}
