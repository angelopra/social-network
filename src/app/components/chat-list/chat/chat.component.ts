import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { MessageDto, ResumedUserDto } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';

const scrollThreshold = 150;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild('messagesDiv') messagesDiv?: ElementRef;

  messages: MessageDto[] = [];
  messageForm = new FormControl('');
  receiver?: ResumedUserDto;
  isFarFromBottom = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private scroller: ViewportScroller) {
    this.route.data.pipe(
      map(({ receiver }) => {
        this.receiver = receiver as ResumedUserDto;
        return this.receiver;
      }),
      switchMap(r => chatService.getMessages(r.id))
    ).subscribe(m => {
      this.messages = m;
      setTimeout(() => this.scrollToBottom());
    });

    chatService.newMessages.subscribe(newMessage => {
      if (newMessage.senderId === this.receiver?.id) {
        this.pushMessage({
          content: newMessage.message,
          received: true,
          createdAtUtc: (new Date()).toISOString(),
        });
      }
    });
  }

  @HostListener('window:scroll')
  setIsFarFromBottom(): void {
    this.isFarFromBottom = window.innerHeight + window.scrollY + scrollThreshold < this.messagesDiv?.nativeElement.offsetHeight;
  }

  sendMessage() {
    if (!this.receiver) {
      throw new Error("receiver should be defined");
    }

    if (this.messageForm.value) {
      this.pushMessage({
        content: this.messageForm.value,
        received: false,
        createdAtUtc: (new Date()).toISOString(),
      });

      this.chatService.send(this.receiver.id, this.messageForm.value);

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
    this.messages.push(message);
    setTimeout(() => {
      this.setIsFarFromBottom();
      if (!this.isFarFromBottom) {
        this.scrollToBottom();
      }
    });
  }
}
