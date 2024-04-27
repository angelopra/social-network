import { Routes } from '@angular/router';
import { HOME_URL } from './app.config';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { userResolver } from './resolvers/user.resolver';
import { ExploreComponent } from './components/explore/explore.component';
import { GroupsComponent } from './components/groups/groups.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectGuard],
  },
  {
    path: '',
    redirectTo: HOME_URL,
    pathMatch: 'full',
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        component: FeedComponent,
      },
      {
        path: 'profile/:userId',
        resolve: { user: userResolver },
        component: ProfileComponent,
      },
      {
        path: 'explore',
        component: ExploreComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
