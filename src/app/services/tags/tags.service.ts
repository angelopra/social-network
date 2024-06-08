import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  getAll(): Observable<string[]> {
    return of(TAGS_MOCK);
  }
}

const TAGS_MOCK: string[] = [
  'coding',
  'music',
  'travel',
  'food',
  'fitness',
  'photography',
  'technology',
  'gaming',
  'reading',
  'sports',
  'movies',
  'programming',
  'yoga',
  'nature',
  'writing',
  'fashion',
  'travel',
  'DIY',
  'gardening',
  'cooking',
];
