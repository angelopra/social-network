import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { MessageDto } from 'src/app/models';
import { environment } from 'src/environments/environment';
import envCommon from 'src/environments/environment.common';
import { AuthService } from '../auth/auth.service';
import { NewMessage } from './new-message.model';
import { parseTemplate } from 'url-template';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection?: HubConnection;
  private _newMessages = new Subject<NewMessage>();

  constructor(private auth: AuthService, private http: HttpClient, private userService: UserService) {
    auth.loggedOut$.subscribe(() => this.disconnect());
  }

  get newMessages(): Observable<NewMessage> {
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

  send(receiverId: string, message: string): void {
    this.hubConnection?.invoke('SendMessage', receiverId, message);
    const chat = this.userService.current?.chats.find(c => c.otherUser.id === receiverId);
    if (chat) {
      chat.lastMessage.content = message;
      chat.lastMessage.createdAtUtc = (new Date()).toISOString();
      chat.lastMessage.received = false;
    }
  }

  private receive = (senderId: string, message: string) => {
    this._newMessages.next({ senderId, message });
    const chat = this.userService.current?.chats.find(c => c.otherUser.id === senderId);
    if (chat) {
      chat.lastMessage.content = message;
      chat.lastMessage.createdAtUtc = (new Date()).toISOString();
      chat.lastMessage.received = true;
    }
  };
}
