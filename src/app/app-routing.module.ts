import { NotFoundComponent } from './error/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ArchivePageComponent } from './archive-page/archive-page.component';
import { VideoPlayerPageComponent } from './video-player-page/video-player-page.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { FormsPageComponent } from './forms-page/forms-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { AuthGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'archive',
    component: ArchivePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'player',
    component: VideoPlayerPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserManagementPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-video',
    component: FormsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-video/:id',
    component: FormsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'more-info/:id',
    component: FormsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
