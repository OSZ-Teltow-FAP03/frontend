import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// Angular Material Imports
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Angular Material Extensions
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MaterialFileInputModule } from 'ngx-material-file-input';

// Localization imports
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

// Own Component imports
import { HeaderComponent } from './shared/components/header/header.component';
import { MovieListComponent } from './archive-page/movie-list/movie-list.component';
import { CustomPaginator } from './shared/functions/custom-paginator';
import { MovieInfoDialogComponent } from './dialogs/movie-info-dialog/movie-info-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './login-page/register/register.component';
import { SendPasswordResetComponent } from './login-page/send-password-reset/send-password-reset.component';
import { LoginComponent } from './login-page/login/login.component';
import { ArchivePageComponent } from './archive-page/archive-page.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { GenericErrorComponent } from './error/generic-error/generic-error.component';
import { VideoPlayerPageComponent } from './video-player-page/video-player-page.component';
import { VideoPlayerComponent } from './video-player-page/video-player/video-player.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserTableComponent } from './user-management-page/user-table/user-table.component';
import { UserActionsComponent } from './user-management-page/user-actions/user-actions.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { RoleChangeDialogComponent } from './dialogs/role-change-dialog/role-change-dialog.component';
import { VideoFormsComponent } from './forms-page/video-forms/video-forms.component';
import { FormsPageComponent } from './forms-page/forms-page.component';

import { environment as env } from './../environments/environment';
import { API_TOKEN } from './shared/api-token';
import { PROD_TOKEN } from './shared/production';

// Videogular imports
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { SECRET_TOKEN } from './shared/secret-key';
import { ApiInterceptor } from './shared/api.interceptor';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchivePageComponent,
    GenericErrorComponent,
    NotFoundComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterComponent,
    SendPasswordResetComponent,
    HeaderComponent,
    MovieListComponent,
    MovieInfoDialogComponent,
    VideoPlayerPageComponent,
    VideoPlayerComponent,
    UserManagementPageComponent,
    UserTableComponent,
    UserActionsComponent,
    ConfirmationDialogComponent,
    RoleChangeDialogComponent,
    VideoFormsComponent,
    FormsPageComponent,
    ChangePasswordPageComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule,
    DragDropModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatPasswordStrengthModule,
    MatPasswordStrengthModule.forRoot(),
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: API_TOKEN, useValue: env.apiURL },
    { provide: PROD_TOKEN, useValue: env.production },
    { provide: SECRET_TOKEN, useValue: env.key },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: CookieService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
