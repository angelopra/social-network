import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatDto } from '../../models/chat.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  get(): Observable<ChatDto[]> {
    return of(CHATS_MOCK);
  }
}

const CHATS_MOCK: ChatDto[] = [
  {
    id: { chatId: '2' },
    otherUser: {
      id: '2',
      firstName: 'Joe',
      lastName: 'Smith',
      profilePictureUrl: '/assets/img/fotingers2.jpg'
    },
    lastMessage: {
      received: false,
      content: 'Check out this new recipe I found!',
      createdAtUtc: new Date('2023-06-02T15:30:00Z')
    }
  },
  {
    id: { chatId: '3' },
    otherUser: {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      profilePictureUrl: '/assets/img/fotingers3.jpg'
    },
    lastMessage: {
      received: true,
      content: 'Have you read the latest book in the series?',
      createdAtUtc: new Date('2023-06-03T10:45:00Z')
    }
  },
  {
    id: { chatId: '4' },
    otherUser: {
      id: '4',
      firstName: 'Emily',
      lastName: 'Brown',
      profilePictureUrl: '/assets/img/fotingers4.jpg'
    },
    lastMessage: {
      received: false,
      content: 'I just finished a new painting!',
      createdAtUtc: new Date('2023-06-04T09:00:00Z')
    }
  },
  {
    id: { chatId: '5' },
    otherUser: {
      id: '5',
      firstName: 'Chris',
      lastName: 'Wilson',
      profilePictureUrl: '/assets/img/fotingers5.jpg'
    },
    lastMessage: {
      received: true,
      content: 'Did you watch the game last night?',
      createdAtUtc: new Date('2023-06-05T20:00:00Z')
    }
  },
  {
    id: { chatId: '6' },
    otherUser: {
      id: '6',
      firstName: 'Sarah',
      lastName: 'Adams',
      profilePictureUrl: '/assets/img/fotingers6.jpg'
    },
    lastMessage: {
      received: false,
      content: 'I found a new yoga routine that you might like.',
      createdAtUtc: new Date('2023-06-06T07:30:00Z')
    }
  },
  {
    id: { chatId: '7' },
    otherUser: {
      id: '7',
      firstName: 'David',
      lastName: 'Miller',
      profilePictureUrl: '/assets/img/fotingers7.jpg'
    },
    lastMessage: {
      received: true,
      content: 'Planning my next trip, any suggestions?',
      createdAtUtc: new Date('2023-06-07T14:15:00Z')
    }
  },
  {
    id: { chatId: '8' },
    otherUser: {
      id: '8',
      firstName: 'Anna',
      lastName: 'Taylor',
      profilePictureUrl: '/assets/img/fotingers8.jpg'
    },
    lastMessage: {
      received: false,
      content: 'My garden is blooming, come and see!',
      createdAtUtc: new Date('2023-06-08T11:00:00Z')
    }
  },
  {
    id: { chatId: '9' },
    otherUser: {
      id: '9',
      firstName: 'Michael',
      lastName: 'Lee',
      profilePictureUrl: '/assets/img/fotingers9.jpg'
    },
    lastMessage: {
      received: true,
      content: 'Just visited the science museum, it was amazing!',
      createdAtUtc: new Date('2023-06-09T13:45:00Z')
    }
  },
  {
    id: { chatId: '10' },
    otherUser: {
      id: '10',
      firstName: 'Sophia',
      lastName: 'Clark',
      profilePictureUrl: '/assets/img/fotingers10.jpg'
    },
    lastMessage: {
      received: false,
      content: 'Can’t wait for our next travel adventure!',
      createdAtUtc: new Date('2023-06-10T08:00:00Z')
    }
  }
];
