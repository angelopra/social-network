import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { groupBy } from 'lodash-es';
import { map, switchMap } from 'rxjs';
import { MessageDto, ResumedUserDto } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';

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

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
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

    const newMessage = this.messageForm.getRawValue();

    if (newMessage) {
      this.pushMessage({
        content: newMessage,
        received: false,
        createdAtUtc: (new Date()).toISOString(),
      });

      this.chatService.send(this.receiver.id, newMessage);

      this.messageForm.reset();
    }
  }

  scrollToBottom(behavior?: ScrollBehavior): void {
    window.scroll({
      top: this.messagesDiv?.nativeElement.offsetHeight,
      behavior,
    });
  }

  private pushMessage(message: MessageDto): void {
    // this.messages.push(message);
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
