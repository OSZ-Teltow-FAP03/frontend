import { NotFoundComponent } from './error/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ArchivePageComponent } from './archive-page/archive-page.component';
import { VideoPlayerPageComponent } from './video-player-page/video-player-page.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'archive', component: ArchivePageComponent },
  { path: 'player', component: VideoPlayerPageComponent },
  { path: 'users', component: UserManagementPageComponent },
  { path: '**', component: NotFoundComponent },
];
//TODO: Authguard
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
