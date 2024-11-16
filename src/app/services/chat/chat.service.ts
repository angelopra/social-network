import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { MessageDto, ResumedUserDto, UserChatDto } from 'src/app/models';
import { environment } from 'src/environments/environment';
import envCommon from 'src/environments/environment.common';
import { AuthService } from '../auth/auth.service';
import { NewMessage } from './new-message.model';
import { parseTemplate } from 'url-template';
import { UserService } from '../user/user.service';
import { compareDesc, parseISO } from 'date-fns';
import { isString } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection?: HubConnection;
  private _newMessages = new Subject<MessageDto>();

  constructor(private auth: AuthService, private http: HttpClient, private userService: UserService) {
    auth.loggedOut$.subscribe(() => this.disconnect());
  }

  get newMessages(): Observable<MessageDto> {
    return this._newMessages.asObservable();
  }

  connect(): void {
    if (!this.hubConnection) {
      this.hubConnection = new HubConnectionBuilder().withUrl(`${environment.baseUrl}/chatHub?idToken=${this.auth.idToken}`).build();
      this.hubConnection.start();
      this.hubConnection.on('ReceiveMessage', this.receive);
    }
  }

  disconnect(): void {
    this.hubConnection?.stop();
    this.hubConnection = undefined;
  }

  getMessages(otherUserId: string): Observable<MessageDto[]> {
    const url = parseTemplate(envCommon.apiRoutes.chat.getMessages).expand({ otherUserId });
    return this.http.get<MessageDto[]>(url);
  }

  send(receiver: ResumedUserDto, message: MessageDto): void {
    this.hubConnection?.invoke('SendMessage', receiver.id, message.content);
    this.updateChats(receiver, message);
  }

  private receive = (senderId: string, message: string) => {
    const newMessage = {
      content: message,
      received: senderId !== this.userService.current?.id,
      createdAtUtc: (new Date()).toISOString(),
    };
    this._newMessages.next(newMessage);
    this.updateChats(senderId, newMessage, false);
  };

  private updateChats(user: string, message: MessageDto, userInformed: false): void;
  private updateChats(user: ResumedUserDto, message: MessageDto, userInformed?: true): void 
  private updateChats(user: ResumedUserDto | string, message: MessageDto, _ = false): void {
    const chat = this.userService.current?.chats.find(c => c.otherUser.id === (isString(user) ? user : user.id));
    if (chat) {
      chat.lastMessage = message;
    } else if (!isString(user)) {
      const newChat: UserChatDto = {
        id: {
          timestamp: Date.now(),
          creationTime: new Date(),
        },
        otherUser: user,
        lastMessage: message,
      };
      this.userService.current?.chats.unshift(newChat);
    }
    this.userService.current?.chats.sort((a, b) => compareDesc(parseISO(a.lastMessage.createdAtUtc), parseISO(b.lastMessage.createdAtUtc)));
  }
}
