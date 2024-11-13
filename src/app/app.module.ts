import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { ContactsComponent } from './components/contacts/contacts.component';
import { MaterialModule } from './material/material.module';
// import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
// import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { DashboardModule } from './components/dashboard/dashboard.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HomeModule } from './components/home/home.module';
import { ApiService } from './shared/api.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './components/auth/login/login.component';
import { ThemeHelpersService } from './shared/theme-helpers.service';
import { AddGroupModule } from './components/shared/add-group/add-group.module';
import { HeaderComponent } from './components/header/header.component';
import { PlyrModule } from 'ngx-plyr';
import { PlayerModule } from './common/player/player.module';
import { FooterComponent } from './components/footer/footer.component';
// import { PlayerComponent } from './common/player/player.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HomeModule,
    AddGroupModule,
    PlyrModule,
    PlayerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [ApiService, ThemeHelpersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
