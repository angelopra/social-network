import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing';
import { AppComponent } from './app.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat-list/chat/chat.component';
import { ContentListComponent } from './components/common/content-list/content-list.component';
import { LoadingComponent } from './components/common/loading/loading.component';
import { UserListComponent } from './components/common/user-list/user-list.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FeedComponent } from './components/feed/feed.component';
import { GroupComponent } from './components/groups/group/group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { INTERCEPTOR_PROVIDERS } from './interceptors/interceptors-provider';
import { ConfirmationDialogComponent } from './services/confirmation/confirmation-dialog/confirmation-dialog.component';
import { ChatDatePipe } from './components/chat-list/chat/chat-date.pipe';
import { InputTextComponent } from './components/common/input-text/input-text.component';
import { CreateGroupDialogComponent } from './components/groups/create-group-dialog/create-group-dialog.component';
import { TagsSelectorComponent } from './components/common/tags-selector/tags-selector.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FeedComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent,
    ExploreComponent,
    GroupsComponent,
    NewPostComponent,
    LoadingComponent,
    ContentListComponent,
    ChatListComponent,
    UserListComponent,
    ChatComponent,
    GroupComponent,
    ConfirmationDialogComponent,
    ChatDatePipe,
    InputTextComponent,
    CreateGroupDialogComponent,
    TagsSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('928983374003-2rm92s0gbucjbk3n7c6i2cs46uis0cc6.apps.googleusercontent.com'),
          }
        ]
      }
    },
    INTERCEPTOR_PROVIDERS,
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
