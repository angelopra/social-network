import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupDto } from 'src/app/models/group.dto';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthService) {}

  get(userId: number): UserDto {
    const user = USERS_MOCK.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with id=${userId} doesn't exist`);
    }
    return user;
  }

  getGroups(): Observable<GroupDto[]> {
    return of(GROUPS_MOCK);
  }

  search(qry: string): UserDto[] {
    return USERS_MOCK.filter(u => u.username.toLowerCase().includes(qry.toLowerCase()));
  }
}

const GROUPS_MOCK: GroupDto[] = [
  {
    id: 1,
    name: 'Music Lovers',
    picture: '/assets/img/group1.jpg',
    lastMessage: {
      id: 1,
      author: 'Alice',
      createdAt: new Date('2024-05-10T14:48:00.000Z'),
      content: 'Check out this new song!',
    },
  },
  {
    id: 2,
    name: 'Book Club',
    picture: '/assets/img/group2.jpg',
    lastMessage: {
      id: 2,
      author: 'Bob',
      createdAt: new Date('2024-05-12T16:20:00.000Z'),
      content: 'Next meeting is on Friday!',
    },
  },
  {
    id: 3,
    name: 'Fitness Enthusiasts',
    picture: '/assets/img/group3.jpg',
    lastMessage: {
      id: 3,
      author: 'Charlie',
      createdAt: new Date('2024-05-15T09:30:00.000Z'),
      content: 'New workout routine posted!',
    },
  },
  {
    id: 4,
    name: 'Travel Buddies',
    picture: '/assets/img/group4.jpg',
    lastMessage: {
      id: 4,
      author: 'Daisy',
      createdAt: new Date('2024-05-14T18:45:00.000Z'),
      content: 'Who’s up for a weekend trip?',
    },
  },
  {
    id: 5,
    name: 'Cooking Recipes',
    picture: '/assets/img/group5.jpg',
    lastMessage: {
      id: 5,
      author: 'Ethan',
      createdAt: new Date('2024-05-13T12:15:00.000Z'),
      content: 'Just tried a new recipe!',
    },
  },
  {
    id: 6,
    name: 'Movie Fans',
    picture: '/assets/img/group6.jpg',
    lastMessage: {
      id: 6,
      author: 'Fiona',
      createdAt: new Date('2024-05-11T20:10:00.000Z'),
      content: 'What did you think of the latest movie?',
    },
  },
  {
    id: 7,
    name: 'Tech Geeks',
    picture: '/assets/img/group7.jpg',
    lastMessage: {
      id: 7,
      author: 'George',
      createdAt: new Date('2024-05-16T14:00:00.000Z'),
      content: 'New gadget release today!',
    },
  },
  {
    id: 8,
    name: 'Pet Lovers',
    picture: '/assets/img/group8.jpg',
    lastMessage: {
      id: 8,
      author: 'Hannah',
      createdAt: new Date('2024-05-17T09:00:00.000Z'),
      content: 'Share photos of your pets!',
    },
  },
  {
    id: 9,
    name: 'Gaming Community',
    picture: '/assets/img/group9.jpg',
    lastMessage: {
      id: 9,
      author: 'Ian',
      createdAt: new Date('2024-05-14T22:30:00.000Z'),
      content: 'Who’s up for a gaming session?',
    },
  },
  {
    id: 10,
    name: 'Art and Design',
    picture: '/assets/img/group10.jpg',
    lastMessage: {
      id: 10,
      author: 'Jane',
      createdAt: new Date('2024-05-13T17:45:00.000Z'),
      content: 'New art exhibition this weekend!',
    },
  },
];

const USERS_MOCK: UserDto[] = [
  {
    id: 1,
    username: 'Angelo Pilotto',
    email: 'angelo@example.com',
    profilePicture: '/assets/img/fotingers1.jpg',
    tags: ['coding', 'music', 'travel'],
    description: 'Passionate programmer, music lover, and avid traveler. Always exploring new technologies and enjoying the rhythm of life.'
  },
  {
    id: 2,
    username: 'Joe Smith',
    email: 'joe@example.com',
    profilePicture: '/assets/img/fotingers2.jpg',
    tags: ['food', 'fitness', 'photography'],
    description: 'Foodie, fitness enthusiast, and amateur photographer. Constantly seeking new culinary experiences and outdoor adventures.'
  },
  {
    id: 3,
    username: 'Mike Johnson',
    email: 'mike@example.com',
    profilePicture: '/assets/img/fotingers3.jpg',
    tags: ['technology', 'gaming', 'reading'],
    description: 'Tech-savvy gamer and bookworm. Fascinated by the possibilities of technology and always immersed in a good book.'
  },
  {
    id: 4,
    username: 'Emily Brown',
    email: 'emily@example.com',
    profilePicture: '/assets/img/fotingers4.jpg',
    tags: ['art', 'design', 'cooking'],
    description: 'Creative artist, designer, and culinary enthusiast. Finding beauty in everyday life and expressing it through various forms of art.'
  },
  {
    id: 5,
    username: 'Chris Wilson',
    email: 'chris@example.com',
    profilePicture: '/assets/img/fotingers5.jpg',
    tags: ['sports', 'movies', 'programming'],
    description: 'Sports fanatic, movie buff, and coding enthusiast. Embracing the excitement of sports, the magic of cinema, and the challenges of programming.'
  },
  {
    id: 6,
    username: 'Sarah Adams',
    email: 'sarah@example.com',
    profilePicture: '/assets/img/fotingers6.jpg',
    tags: ['yoga', 'nature', 'writing'],
    description: 'Yoga lover, nature enthusiast, and aspiring writer. Finding peace and inspiration in the serenity of nature and the practice of yoga.'
  },
  {
    id: 7,
    username: 'David Miller',
    email: 'david@example.com',
    profilePicture: '/assets/img/fotingers7.jpg',
    tags: ['fashion', 'travel', 'DIY'],
    description: 'Fashionista, travel addict, and DIY enthusiast. Exploring new fashion trends, exotic destinations, and creative DIY projects.'
  },
  {
    id: 8,
    username: 'Anna Taylor',
    email: 'anna@example.com',
    profilePicture: '/assets/img/fotingers8.jpg',
    tags: ['music', 'gardening', 'cooking'],
    description: 'Music lover, gardening enthusiast, and culinary artist. Nurturing plants, cooking delicious meals, and dancing to the rhythm of life.'
  },
  {
    id: 9,
    username: 'Michae lLee',
    email: 'michael@example.com',
    profilePicture: '/assets/img/fotingers9.jpg',
    tags: ['science', 'history', 'photography'],
    description: 'Science geek, history buff, and photography enthusiast. Exploring the mysteries of science, unraveling the tales of history, and capturing moments through the lens.'
  },
  {
    id: 10,
    username: 'Sophia Clark',
    email: 'sophia@example.com',
    profilePicture: '/assets/img/fotingers10.jpg',
    tags: ['travel', 'food', 'music'],
    description: 'Wanderlust traveler, food connoisseur, and music aficionado. Tasting new cuisines, exploring exotic destinations, and dancing to the rhythm of different cultures.'
  }
];
