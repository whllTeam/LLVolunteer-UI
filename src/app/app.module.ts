import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routeDatas } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { VolunteerModule } from './volunteer/volunteer.module';
import { RouterModule } from '@angular/router';
import { OidcModule } from './oidc/oidc.module';
import { AuthorizationHeaderInterceptor } from './oidc/Interceptors/authorization-header-interceptor.interceptor';
import { IdentityService } from './oidc/Service/identity.service';
import { AuthenUserRouteGuard } from './Guard/authen-user-route.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './Services/signup.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeDatas),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VolunteerModule,
    OidcModule
  ],
  providers: [
    IdentityService,
    SignupService,
    AuthenUserRouteGuard,
    { provide: NZ_I18N, useValue: en_US },
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
