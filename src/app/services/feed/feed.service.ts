import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostDto } from 'src/app/models/post.dto';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getPosts(): Observable<PostDto[]> {
    POSTS_MOCK.forEach(p => {
      const user = this.userService.get(p.userId);
      p.profilePicture = user.profilePicture;
      p.username = user.username;
    });
    return of(POSTS_MOCK);
  }
}

const POSTS_MOCK: PostDto[] = [
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 1,
    createdAt: new Date('2024-04-27T08:00:00'),
    content: 'Just had the best coffee ever! ☕️ #coffeeaddict'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 2,
    createdAt: new Date('2024-04-26T15:30:00'),
    content: 'Excited to announce that I will be speaking at the upcoming tech conference! 🚀 #techlife'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 3,
    createdAt: new Date('2024-04-25T12:45:00'),
    content: 'Just finished reading an amazing book. Highly recommend it! 📚 #readinglist'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 2,
    createdAt: new Date('2024-04-24T18:20:00'),
    content: 'Enjoying the beautiful sunset at the beach. 🌅 #naturelover'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 5,
    createdAt: new Date('2024-04-23T10:10:00'),
    content: 'Started learning a new programming language today. Excited for the journey! 💻 #coding'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 6,
    createdAt: new Date('2024-04-22T09:15:00'),
    content: 'Had a fantastic hiking trip over the weekend. The views were breathtaking! ⛰️ #hikingadventures'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 2,
    createdAt: new Date('2024-04-21T14:30:00'),
    content: 'Just adopted a new puppy! Meet Max, the newest member of our family. 🐶❤️ #puppylove'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 1,
    createdAt: new Date('2024-04-20T11:20:00'),
    content: 'Celebrating my birthday today with friends and family. Grateful for another year! 🎂🎉 #birthdaycelebration'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 3,
    createdAt: new Date('2024-04-19T16:45:00'),
    content: 'Visited an art exhibition downtown. So much creativity and inspiration! 🎨 #artlover'
  },
  {
    id: 1,
    username: '',
    profilePicture: '',
    userId: 6,
    createdAt: new Date('2024-04-18T10:05:00'),
    content: 'Starting a new blog about travel tips and adventures. Stay tuned for updates! ✈️🌍 #travelblogger'
  }
];
