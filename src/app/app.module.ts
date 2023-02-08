import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { GenericErrorComponent } from './error/generic-error/generic-error.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArchiveComponent } from './archive/archive.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './login-page/register/register.component';
import { SendPasswordResetComponent } from './login-page/send-password-reset/send-password-reset.component';
import { LoginComponent } from './login-page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchiveComponent,
    GenericErrorComponent,
    NotFoundComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterComponent,
    SendPasswordResetComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
