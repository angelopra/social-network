import { Routes } from '@angular/router';
import { CHATS_URL, HOME_URL, LOGIN_URL } from './app.config';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { userResolver } from './resolvers/user.resolver';
import { ExploreComponent } from './components/explore/explore.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat-list/chat/chat.component';
import { GroupComponent } from './components/groups/group/group.component';
import { resumedUserResolver } from './resolvers/resumed-user.resolver';
import { currentUserResolver } from './resolvers/current-user.resolver';

const showMenu = true;
export const routes: Routes = [
  {
    path: LOGIN_URL,
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
    resolve: { currentUser: currentUserResolver },
    children: [
      {
        path: HOME_URL,
        data: { showMenu },
        component: FeedComponent,
      },
      {
        path: CHATS_URL,
        children: [
          {
            path: '',
            data: { showMenu },
            component: ChatListComponent,
          },
          {
            path: ':userId',
            resolve: { receiver: resumedUserResolver },
            component: ChatComponent,
          },
        ],
      },
      {
        path: 'profile/:userId',
        resolve: { user: userResolver },
        data: { showMenu },
        component: ProfileComponent,
      },
      {
        path: 'explore',
        data: { showMenu },
        component: ExploreComponent,
      },
      {
        path: 'groups',
        data: { showMenu },
        children: [
          {
            path: '',
            component: GroupsComponent,
          },
          {
            path: ':groupId',
            component: GroupComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
