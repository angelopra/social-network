import { Injectable } from '@angular/core';
import { UserDto } from 'src/app/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get(userId: number): UserDto {
    const user = USERS_MOCK.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with id=${userId} doesn't exist`);
    }
    return user;
  }

  search(qry: string): UserDto[] {
    return USERS_MOCK.filter(u => u.username.toLowerCase().includes(qry.toLowerCase()));
  }
}

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
