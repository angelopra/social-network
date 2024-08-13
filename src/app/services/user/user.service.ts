import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { CurrentUserDto } from 'src/app/models/user/current-user.dto';
import { UserDto } from 'src/app/models/user/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public current?: CurrentUserDto;

  get(userId: string): any {
    const user = USERS_MOCK.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with id=${userId} doesn't exist`);
    }
    return user;
  }

  getGroups(): Observable<any[]> {
    return of(GROUPS_MOCK).pipe(tap(groups => groups.forEach(g => {
      if (g.lastPost) {
        const user = this.get(g.lastPost.userId);
        g.lastPost.firstName = user.firstName;
        g.lastPost.lastName = user.lastName;
      }
    })));
  }

  search(qry: string): any[] {
    return USERS_MOCK.filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(qry.toLowerCase()));
  }

  getCurrent(): Observable<any> {
    return of(USERS_MOCK[0]).pipe(
      tap(u => this.current = u)
    );
  }

  createPost(): Observable<void> {
    return of(void 0).pipe(delay(1000));
  }
}

const GROUPS_MOCK: any[] = [
  {
    id: '1',
    name: 'Music Lovers',
    picture: '/assets/img/group1.jpg',
    createdAt: new Date('2024-05-10T14:48:00.000Z'),
  },
  {
    id: '2',
    name: 'Book Club',
    picture: '/assets/img/group2.jpg',
    createdAt: new Date('2024-05-12T16:20:00.000Z'),
    lastPost: {
      id: '2',
      userId: '2',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'Next meeting is on Friday!',
      createdAt: new Date('2024-05-12T16:20:00.000Z'),
    },
  },
  {
    id: '3',
    name: 'Fitness Enthusiasts',
    picture: '/assets/img/group3.jpg',
    createdAt: new Date('2024-05-15T09:30:00.000Z'),
    lastPost: {
      id: '3',
      userId: '3',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'New workout routine posted!',
      createdAt: new Date('2024-05-15T09:30:00.000Z'),
    },
  },
  {
    id: '4',
    name: 'Travel Buddies',
    picture: '/assets/img/group4.jpg',
    createdAt: new Date('2024-05-14T18:45:00.000Z'),
  },
  {
    id: '5',
    name: 'Cooking Recipes',
    picture: '/assets/img/group5.jpg',
    createdAt: new Date('2024-05-13T12:15:00.000Z'),
    lastPost: {
      id: '5',
      userId: '5',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'Just tried a new recipe!',
      createdAt: new Date('2024-05-13T12:15:00.000Z'),
    },
  },
  {
    id: '6',
    name: 'Movie Fans',
    picture: '/assets/img/group6.jpg',
    createdAt: new Date('2024-05-11T20:10:00.000Z'),
    lastPost: {
      id: '6',
      userId: '6',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'What did you think of the latest movie?',
      createdAt: new Date('2024-05-11T20:10:00.000Z'),
    },
  },
  {
    id: '7',
    name: 'Tech Geeks',
    picture: '/assets/img/group7.jpg',
    createdAt: new Date('2024-05-16T14:00:00.000Z'),
    lastPost: {
      id: '7',
      userId: '7',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'New gadget release today!',
      createdAt: new Date('2024-05-16T14:00:00.000Z'),
    },
  },
  {
    id: '8',
    name: 'Pet Lovers',
    picture: '/assets/img/group8.jpg',
    createdAt: new Date('2024-05-17T09:00:00.000Z'),
  },
  {
    id: '9',
    name: 'Gaming Community',
    picture: '/assets/img/group9.jpg',
    createdAt: new Date('2024-05-14T22:30:00.000Z'),
    lastPost: {
      id: '9',
      userId: '9',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'Who’s up for a gaming session?',
      createdAt: new Date('2024-05-14T22:30:00.000Z'),
    },
  },
  {
    id: '10',
    name: 'Art and Design',
    picture: '/assets/img/group10.jpg',
    createdAt: new Date('2024-05-13T17:45:00.000Z'),
    lastPost: {
      id: '10',
      userId: '10',
      firstName: '',
      lastName: '',
      profilePicture: '/assets/img/fotingers.jpg',
      content: 'New art exhibition this weekend!',
      createdAt: new Date('2024-05-13T17:45:00.000Z'),
    },
  },
];

const USERS_MOCK: any[] = [
  {
    id: '1',
    firstName: 'Angelo',
    lastName: 'Pilotto',
    email: 'angelo@example.com',
    profilePicture: '/assets/img/fotingers1.jpg',
    tags: ['coding', 'music', 'travel'],
    about: 'Passionate programmer, music lover, and avid traveler. Always exploring new technologies and enjoying the rhythm of life.'
  },
  {
    id: '2',
    firstName: 'Joe',
    lastName: 'Smith',
    email: 'joe@example.com',
    profilePicture: '/assets/img/fotingers2.jpg',
    tags: ['food', 'fitness', 'photography'],
    about: 'Foodie, fitness enthusiast, and amateur photographer. Constantly seeking new culinary experiences and outdoor adventures.'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    profilePicture: '/assets/img/fotingers3.jpg',
    tags: ['technology', 'gaming', 'reading'],
    about: 'Tech-savvy gamer and bookworm. Fascinated by the possibilities of technology and always immersed in a good book.'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily@example.com',
    profilePicture: '/assets/img/fotingers4.jpg',
    tags: ['art', 'design', 'cooking'],
    about: 'Creative artist, designer, and culinary enthusiast. Finding beauty in everyday life and expressing it through various forms of art.'
  },
  {
    id: '5',
    firstName: 'Chris',
    lastName: 'Wilson',
    email: 'chris@example.com',
    profilePicture: '/assets/img/fotingers5.jpg',
    tags: ['sports', 'movies', 'programming'],
    about: 'Sports fanatic, movie buff, and coding enthusiast. Embracing the excitement of sports, the magic of cinema, and the challenges of programming.'
  },
  {
    id: '6',
    firstName: 'Sarah',
    lastName: 'Adams',
    email: 'sarah@example.com',
    profilePicture: '/assets/img/fotingers6.jpg',
    tags: ['yoga', 'nature', 'writing'],
    about: 'Yoga lover, nature enthusiast, and aspiring writer. Finding peace and inspiration in the serenity of nature and the practice of yoga.'
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david@example.com',
    profilePicture: '/assets/img/fotingers7.jpg',
    tags: ['fashion', 'travel', 'DIY'],
    about: 'Fashionista, travel addict, and DIY enthusiast. Exploring new fashion trends, exotic destinations, and creative DIY projects.'
  },
  {
    id: '8',
    firstName: 'Anna',
    lastName: 'Taylor',
    email: 'anna@example.com',
    profilePicture: '/assets/img/fotingers8.jpg',
    tags: ['music', 'gardening', 'cooking'],
    about: 'Music lover, gardening enthusiast, and culinary artist. Nurturing plants, cooking delicious meals, and dancing to the rhythm of life.'
  },
  {
    id: '9',
    firstName: 'Michae',
    lastName: 'Lee',
    email: 'michael@example.com',
    profilePicture: '/assets/img/fotingers9.jpg',
    tags: ['science', 'history', 'photography'],
    about: 'Science geek, history buff, and photography enthusiast. Exploring the mysteries of science, unraveling the tales of history, and capturing moments through the lens.'
  },
  {
    id: '10',
    firstName: 'Sophia',
    lastName: 'Clark',
    email: 'sophia@example.com',
    profilePicture: '/assets/img/fotingers10.jpg',
    tags: ['travel', 'food', 'music'],
    about: 'Wanderlust traveler, food connoisseur, and music aficionado. Tasting new cuisines, exploring exotic destinations, and dancing to the rhythm of different cultures.'
  }
];
