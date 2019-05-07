import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { RecipientsComponent } from './components/recipients/recipients.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { SubmissionComponent } from './components/submission/submission.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RecipientsComponent,
    RecipientComponent,
    SubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
